package com.uvapwp.partners.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class PartnersService {

    private final Firestore firestore;
    private final StorageClient storageClient;

    public PartnersService(Firestore firestore, StorageClient storageClient) {
        this.firestore = firestore;
        this.storageClient = storageClient;
    }

    public Map<String, Object> getPartners() throws ExecutionException, InterruptedException {
        var partnersCollection = firestore.collection("partners");
        var partnersSnapshot = partnersCollection.get().get();

        var partners = partnersSnapshot.getDocuments().stream().map(doc -> {
            var partner = doc.getData();
            partner.put("id", doc.getId());
            return partner;
        }).toList();

        var result = new HashMap<String, Object>();
        result.put("totalCount", partnersSnapshot.size());
        result.put("partners", partners);
        return result;
    }

    public Map<String, Object> addPartner(String name, MultipartFile image) throws Exception {
        String fileName = "partners/" + System.currentTimeMillis() + "-" + image.getOriginalFilename();
        InputStream imageStream = image.getInputStream();
        Blob blob = storageClient.bucket().create(fileName, imageStream, image.getContentType());

        if (blob == null) {
            throw new Exception("Failed to upload image to Firebase Storage");
        }
        blob.createAcl(com.google.cloud.storage.Acl.of(com.google.cloud.storage.Acl.User.ofAllUsers(), com.google.cloud.storage.Acl.Role.READER));

        String imageUrl = String.format("https://storage.googleapis.com/%s/%s", storageClient.bucket().getName(), fileName);

        var partnerData = new HashMap<String, Object>();
        partnerData.put("name", name);
        partnerData.put("imageUrl", imageUrl);

        var partnersCollection = firestore.collection("partners");
        var partnerRef = partnersCollection.add(partnerData).get();

        var partnerDoc = partnerRef.get().get();
        var newPartner = partnerDoc.getData();
        if (newPartner != null) {
            newPartner.put("id", partnerRef.getId());
        }
        return newPartner;
    }

    public void updatePartner(String partnerId, String name, MultipartFile image) throws Exception {
        var partnerRef = firestore.collection("partners").document(partnerId);
        var partnerDoc = partnerRef.get().get();

        if (!partnerDoc.exists()) {
            throw new Exception("Partner not found");
        }

        var partnerData = new HashMap<String, Object>();
        if (name != null) {
            partnerData.put("name", name);
        }

        if (image != null) {
            String oldImageUrl = (String) partnerDoc.get("imageUrl");
            if (oldImageUrl != null) {
                deleteFileFromStorage(oldImageUrl);
            }

            String fileName = "partners/" + System.currentTimeMillis() + "-" + image.getOriginalFilename();
            InputStream imageStream = image.getInputStream();
            Blob blob = storageClient.bucket().create(fileName, imageStream, image.getContentType());
            if (blob == null) {
                throw new Exception("Failed to upload new image");
            }
            blob.createAcl(com.google.cloud.storage.Acl.of(com.google.cloud.storage.Acl.User.ofAllUsers(), com.google.cloud.storage.Acl.Role.READER));

            partnerData.put("imageUrl", String.format("https://storage.googleapis.com/%s/%s", storageClient.bucket().getName(), fileName));
        }

        partnerRef.update(partnerData).get();
    }

    public void deletePartner(String partnerId) throws Exception {
        var partnerRef = firestore.collection("partners").document(partnerId);
        var partnerDoc = partnerRef.get().get();

        if (!partnerDoc.exists()) {
            throw new Exception("Partner not found");
        }

        String imageUrl = (String) partnerDoc.get("imageUrl");
        if (imageUrl != null) {
            deleteFileFromStorage(imageUrl);
        }

        partnerRef.delete().get();
    }

    private void deleteFileFromStorage(String fileUrl) {
        String filePath = extractFilePathFromUrl(fileUrl);
        if (filePath != null) {
            Blob blob = storageClient.bucket().get(filePath);
            if (blob != null) {
                blob.delete();
            }
        }
    }

    private String extractFilePathFromUrl(String url) {
        if (url.startsWith("https://storage.googleapis.com")) {
            return url.split("/", 4)[3];
        } else if (url.startsWith("https://firebasestorage.googleapis.com")) {
            String[] parts = url.split("/o/");
            return parts.length == 2 ? parts[1].split("\\?")[0] : null;
        }
        return null;
    }
}

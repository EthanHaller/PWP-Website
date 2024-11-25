package com.uvapwp.projects.service;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
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
public class ProjectsService {

    private final Firestore firestore;
    private final StorageClient storageClient;

    public ProjectsService(Firestore firestore, StorageClient storageClient) {
        this.firestore = firestore;
        this.storageClient = storageClient;
    }

    public Map<String, Object> getProjects() throws ExecutionException, InterruptedException {
        var projectsCollection = firestore.collection("projects");
        var projectsSnapshot = projectsCollection.get().get();

        var projects = projectsSnapshot.getDocuments().stream()
                .map(doc -> {
                    Map<String, Object> project = doc.getData();
                    project.put("id", doc.getId());
                    return project;
                }).toList();

        Map<String, Object> result = new HashMap<>();
        result.put("totalCount", projectsSnapshot.size());
        result.put("projects", projects);
        return result;
    }

    public void addProject(String title, String date, MultipartFile coverImage, MultipartFile presentation) throws Exception {
        String coverImageUrl = uploadFile(coverImage, "projects");
        String presentationUrl = uploadFile(presentation, "projects");

        var projectData = new HashMap<String, Object>();
        projectData.put("title", title);
        projectData.put("date", date);
        projectData.put("coverImageUrl", coverImageUrl);
        projectData.put("presentationUrl", presentationUrl);

        firestore.collection("projects").add(projectData).get();
    }

    public void updateProject(String projectId, String title, String date, MultipartFile coverImage, MultipartFile presentation) throws Exception {
        DocumentReference projectRef = firestore.collection("projects").document(projectId);
        DocumentSnapshot projectDoc = projectRef.get().get();

        if (!projectDoc.exists()) {
            throw new Exception("Project not found");
        }

        var projectData = new HashMap<String, Object>();
        if (title != null) projectData.put("title", title);
        if (date != null) projectData.put("date", date);
        if (coverImage != null) {
            deleteFile(projectDoc.getString("coverImageUrl"));
            projectData.put("coverImageUrl", uploadFile(coverImage, "projects"));
        }
        if (presentation != null) {
            deleteFile(projectDoc.getString("presentationUrl"));
            projectData.put("presentationUrl", uploadFile(presentation, "projects"));
        }

        projectRef.update(projectData).get();
    }

    public void deleteProject(String projectId) throws Exception {
        DocumentReference projectRef = firestore.collection("projects").document(projectId);
        DocumentSnapshot projectDoc = projectRef.get().get();

        if (!projectDoc.exists()) {
            throw new Exception("Project not found");
        }

        deleteFile(projectDoc.getString("coverImageUrl"));
        deleteFile(projectDoc.getString("presentationUrl"));
        projectRef.delete().get();
    }

    private String uploadFile(MultipartFile file, String folder) throws Exception {
        String fileName = folder + "/" + System.currentTimeMillis() + "-" + file.getOriginalFilename();
        InputStream fileStream = file.getInputStream();
        Blob blob = storageClient.bucket().create(fileName, fileStream, file.getContentType());

        if (blob == null) {
            throw new Exception("Failed to upload file to Firebase Storage");
        }
        blob.createAcl(com.google.cloud.storage.Acl.of(com.google.cloud.storage.Acl.User.ofAllUsers(), com.google.cloud.storage.Acl.Role.READER));

        return String.format("https://storage.googleapis.com/%s/%s", storageClient.bucket().getName(), fileName);
    }

    private void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            System.out.println("File URL is null or empty");
            return;
        }
    
        String filePath = extractFilePathFromUrl(fileUrl);
        if (filePath == null) {
            System.out.println("Invalid file URL: " + fileUrl);
            return;
        }
    
        Blob fileBlob = storageClient.bucket().get(filePath);
        if (fileBlob != null) {
            fileBlob.delete();
        } else {
            System.out.println("File not found in storage: " + filePath);
        }
    }
    
    private String extractFilePathFromUrl(String url) {
        if (url.startsWith("https://firebasestorage.googleapis.com/v0/b/")) {
            String[] parts = url.split("/o/");
            if (parts.length == 2) {
                String filePathWithParams = parts[1];
                return java.net.URLDecoder.decode(filePathWithParams.split("\\?")[0], java.nio.charset.StandardCharsets.UTF_8);
            }
        } else if (url.startsWith("https://storage.googleapis.com/")) {
            String[] parts = url.split(".appspot.com/");
            if (parts.length == 2) {
                return parts[1]; 
            }
        }
        return null;
    }
    
}

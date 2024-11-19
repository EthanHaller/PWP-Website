package com.uvapwp.members.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class MembersService {

    private final Firestore firestore;
    private final StorageClient storageClient;

    public MembersService(Firestore firestore, StorageClient storageClient) {
        this.firestore = firestore;
        this.storageClient = storageClient;
    }

    public Map<String, Object> getMembers() throws ExecutionException, InterruptedException {
        var membersCollection = firestore.collection("members");
        var membersSnapshot = membersCollection.get().get();

        var exec = new ArrayList<Object>();
        var nonExec = new ArrayList<Object>();

        for (var doc : membersSnapshot.getDocuments()) {
            Map<String, Object> member = doc.getData();
            member.put("id", doc.getId());

            if (member.get("execRole") != null && member.get("execRole") instanceof DocumentReference) {
                DocumentReference execRoleRef = (DocumentReference) member.get("execRole");
                DocumentSnapshot execRoleDoc = execRoleRef.get().get();

                if (execRoleDoc.exists()) {
                    member.put("execRole", execRoleDoc.getString("name"));
                    member.put("relativeOrder", execRoleDoc.getLong("relativeOrder"));
                }
                exec.add(member);
            } else {
                nonExec.add(member);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalCount", membersSnapshot.size());
        result.put("exec", exec);
        result.put("nonExec", nonExec);
        return result;
    }


    public Map<String, Object> addMember(String name, String execRole, MultipartFile headshot) throws Exception {
        // Step 1: Upload file to Firebase Storage
        String fileName = "members/" + System.currentTimeMillis() + "-" + headshot.getOriginalFilename();
        InputStream headshotStream = headshot.getInputStream();
        storageClient.bucket().create(fileName, headshotStream, headshot.getContentType());
        String headshotUrl = String.format("https://storage.googleapis.com/%s/%s",
                storageClient.bucket().getName(), fileName);
    
        // Step 2: Get or create execRole reference
        DocumentReference execRoleRef = null;
        if (execRole != null) {
            var execRoles = firestore.collection("execRoles");
            var execRoleSnapshot = execRoles.whereEqualTo("name", execRole).get().get();
    
            if (execRoleSnapshot.isEmpty()) {
                var newExecRole = new HashMap<String, Object>();
                newExecRole.put("name", execRole);
                newExecRole.put("relativeOrder", 999);
                execRoleRef = execRoles.add(newExecRole).get();
            } else {
                execRoleRef = execRoleSnapshot.getDocuments().get(0).getReference();
            }
        }
    
        // Step 3: Save member data to Firestore
        var memberData = new HashMap<String, Object>();
        memberData.put("name", name);
        memberData.put("headshotUrl", headshotUrl);
        if (execRoleRef != null) {
            memberData.put("execRole", execRoleRef);
        }
        var membersCollection = firestore.collection("members");
        var memberRef = membersCollection.add(memberData).get();
    
        // Step 4: Return saved member data
        DocumentSnapshot newMemberDoc = memberRef.get().get();
        Map<String, Object> newMember = newMemberDoc.getData();
        if (newMember != null) {
            newMember.put("id", memberRef.getId());
        }
        return newMember;
    }
    
    public Map<String, Object> updateMember(String memberId, String name, String execRole, MultipartFile headshot) throws Exception {
        // Step 1: Reference to the member document
        DocumentReference memberRef = firestore.collection("members").document(memberId);
    
        // Step 2: Prepare data to update
        Map<String, Object> memberData = new HashMap<>();
        if (name != null) {
            memberData.put("name", name);
        }
    
        if (headshot != null) {
            // Upload new headshot to Firebase Storage
            String fileName = "members/" + System.currentTimeMillis() + "-" + headshot.getOriginalFilename();
            InputStream headshotStream = headshot.getInputStream();
            storageClient.bucket().create(fileName, headshotStream, headshot.getContentType());
            String headshotUrl = String.format("https://storage.googleapis.com/%s/%s",
                    storageClient.bucket().getName(), fileName);
            memberData.put("headshotUrl", headshotUrl);
        }
    
        if (execRole != null) {
            var execRoles = firestore.collection("execRoles");
            var execRoleSnapshot = execRoles.whereEqualTo("name", execRole).get().get();
    
            if (execRoleSnapshot.isEmpty()) {
                var newExecRole = new HashMap<String, Object>();
                newExecRole.put("name", execRole);
                newExecRole.put("relativeOrder", 999);
                DocumentReference execRoleRef = execRoles.add(newExecRole).get();
                memberData.put("execRole", execRoleRef);
            } else {
                DocumentReference execRoleRef = execRoleSnapshot.getDocuments().get(0).getReference();
                memberData.put("execRole", execRoleRef);
            }
        }
    
        // Step 3: Update member document
        memberRef.update(memberData).get();
    
        // Step 4: Return updated member data
        DocumentSnapshot updatedMemberDoc = memberRef.get().get();
        Map<String, Object> updatedMember = updatedMemberDoc.getData();
        if (updatedMember != null) {
            updatedMember.put("id", memberId);
        }
        return updatedMember;
    }

    public void deleteMember(String memberId) throws Exception {
        // Step 1: Reference to the member document
        DocumentReference memberRef = firestore.collection("members").document(memberId);
    
        // Step 2: Get the member document data
        DocumentSnapshot memberDoc = memberRef.get().get();
        if (!memberDoc.exists()) {
            throw new Exception("Member not found");
        }
    
        // Step 3: Delete the headshot file from Firebase Storage
        String headshotUrl = (String) memberDoc.get("headshotUrl");
        if (headshotUrl != null) {
            String filePath = headshotUrl.split("/")[3]; // Extract the file path
            storageClient.bucket().get(filePath).delete();
        }
    
        // Step 4: Delete the member document
        memberRef.delete().get();
    }

    public void updateRoleOrder(List<String> roles) throws ExecutionException, InterruptedException {
        var execRolesCollection = firestore.collection("execRoles");
        var execRoleSnapshot = execRolesCollection.get().get();
        WriteBatch batch = firestore.batch();

        for (int index = 0; index < roles.size(); index++) {
            String roleName = roles.get(index);
            DocumentSnapshot matchingRoleDoc = execRoleSnapshot.getDocuments().stream()
                    .filter(doc -> roleName.equals(doc.getString("name")))
                    .findFirst()
                    .orElse(null);

            if (matchingRoleDoc != null) {
                batch.update(matchingRoleDoc.getReference(), "relativeOrder", index);
            }
        }

        batch.commit().get();
    }
}
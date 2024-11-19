package com.uvapwp.members.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
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
    
}
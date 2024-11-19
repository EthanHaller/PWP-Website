package com.uvapwp.recruitment.service;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class RecruitmentService {

    private final Firestore firestore;

    public RecruitmentService(Firestore firestore) {
        this.firestore = firestore;
    }

    public Map<String, Object> getRecruitmentInfo() throws ExecutionException, InterruptedException {
        DocumentReference recruitmentDocRef = firestore.collection("recruitment").document("generalInfo");
        DocumentSnapshot recruitmentDoc = recruitmentDocRef.get().get();

        if (recruitmentDoc.exists()) {
            return recruitmentDoc.getData();
        } else {
            throw new RuntimeException("No general info found");
        }
    }

    public Map<String, Object> updateRecruitmentInfo(Map<String, Object> recruitmentData) throws ExecutionException, InterruptedException {
        DocumentReference recruitmentDocRef = firestore.collection("recruitment").document("generalInfo");

        recruitmentDocRef.update(recruitmentData).get();

        DocumentSnapshot updatedRecruitmentDoc = recruitmentDocRef.get().get();
        return updatedRecruitmentDoc.getData();
    }
}

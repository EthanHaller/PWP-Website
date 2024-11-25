package com.uvapwp.admin.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    public List<Object> listUsers() throws Exception {
        var users = FirebaseAuth.getInstance().listUsers(null);
        return users.streamValues().map(user -> Map.of(
                "uid", user.getUid(),
                "email", user.getEmail(),
                "displayName", user.getDisplayName(),
                "creationTimestamp", user.getUserMetadata().getCreationTimestamp(),
                "lastSignInTimestamp", user.getUserMetadata().getLastSignInTimestamp()
        )).collect(Collectors.toList());
    }

    public Map<String, Object> addUser(Map<String, String> userRequest) throws Exception {
        String email = userRequest.get("email");
        String displayName = userRequest.get("displayName");
        String temporaryPassword = generateRandomPassword();

        UserRecord.CreateRequest request = new UserRecord.CreateRequest()
                .setEmail(email)
                .setDisplayName(displayName)
                .setPassword(temporaryPassword);

        UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

        return Map.of(
                "message", "User created successfully",
                "email", userRecord.getEmail(),
                "uid", userRecord.getUid(),
                "temporaryPassword", temporaryPassword
        );
    }

    public void deleteUser(String uid) throws Exception {
        FirebaseAuth.getInstance().deleteUser(uid);
    }

    private String generateRandomPassword() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[12];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, 12);
    }
}

package com.uvapwp.countries.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteBatch;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class CountriesService {

    private final Firestore firestore;

    public CountriesService(Firestore firestore) {
        this.firestore = firestore;
    }

    public void addCountries(List<String> countries) throws ExecutionException, InterruptedException {
        var countriesCollection = firestore.collection("countries");
        WriteBatch batch = firestore.batch();

        for (String countryName : countries) {
            Map<String, Object> countryData = new HashMap<>();
            countryData.put("name", countryName);

            DocumentReference newCountryRef = countriesCollection.document();
            batch.set(newCountryRef, countryData);
        }

        batch.commit().get();
    }

    public Map<String, Object> getCountries() throws ExecutionException, InterruptedException {
        var countriesCollection = firestore.collection("countries");
        var querySnapshot = countriesCollection.get().get();

        List<Map<String, Object>> countries = new ArrayList<>();
        for (DocumentSnapshot doc : querySnapshot.getDocuments()) {
            Map<String, Object> country = doc.getData();
            if (country != null) {
                country.put("id", doc.getId());
                countries.add(country);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("totalCount", querySnapshot.size());
        result.put("countries", countries);

        return result;
    }

    public void deleteCountry(String id) throws ExecutionException, InterruptedException {
        DocumentReference countryDoc = firestore.collection("countries").document(id);

        if (!countryDoc.get().get().exists()) {
            throw new RuntimeException("Country not found");
        }

        countryDoc.delete().get();
    }
}

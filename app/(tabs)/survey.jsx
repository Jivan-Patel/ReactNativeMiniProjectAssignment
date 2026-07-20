import { View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useCallback } from 'react';

import * as Location from 'expo-location';


const CreateSurveyScreen = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [surveys, setSurveys] = useState([]);

  const survey = {
    surveyId: "SUR-001",
    siteName: "",
    client: "",
    contact: "",
    location: "",
    notes: "",
    priority: "Medium",
    date: new Date(),
  };

  const priorityOptions = [
    {
      id: 1,
      label: "High",
      value: "High",
      color: "#EF4444",
    },
    {
      id: 2,
      label: "Medium",
      value: "Medium",
      color: "#F59E0B",
    },
    {
      id: 3,
      label: "Low",
      value: "Low",
      color: "#10B981",
    },
  ];


  const [data, setData] = useState(survey);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  
  useFocusEffect(
    useCallback(() => {
      const fetchSurveys = async () => {
        try {
          const storedSurveys = await AsyncStorage.getItem("surveys");

          if (storedSurveys) {
            const parsed = JSON.parse(storedSurveys);
            setSurveys(parsed);
            setData({
              ...survey,
              surveyId: `SUR-${parsed.length + 1}`,
            });
          } else {
            setSurveys([]);
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchSurveys();
    }, [])
  );

  const handleSubmit = async () => {
    if (!data.siteName.trim()) {
      Alert.alert("Validation", "Please enter Site Name");
      return;
    }

    if (!data.client.trim()) {
      Alert.alert("Validation", "Please enter Client Name");
      return;
    }

    if (!data.contact.trim()) {
      Alert.alert("Validation", "Please enter Contact Number");
      return;
    }

    if (!data.notes.trim()) {
      Alert.alert("Validation", "Please enter notes");
      return;
    }

    if (!data.priority) {
      Alert.alert("Validation", "Please select Priority");
      return;
    }

    Alert.alert("Success", "Survey created successfully!");

    setData({
      ...data,
      date: new Date(),
    });

    await AsyncStorage.setItem("currentSurvey", JSON.stringify(data));
  };



  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Location Access Denied", "Please allow location permission to use this feature")
      return;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(currentLocation.coords);

      const reverseGeocode = await Location.reverseGeocodeAsync(currentLocation.coords);
      const place = reverseGeocode[0];

      setAddress(place);

      setData(prev => ({
        ...prev,
        location: `${place.name}, ${place.city}, ${place.country}`,
      }));


    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Please try again.")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.heading}>Create new survey</Text>


        <Text style={styles.label}>Survey ID</Text>
        <TextInput
          placeholder='Enter Survey ID'
          value={data.surveyId}
          style={[styles.input, styles.disabledInput]}
          editable={false}
        />

        <Text style={styles.label}>Site Name</Text>
        <TextInput
          placeholder='Enter Site Name'
          value={data.siteName}
          onChangeText={(text) => setData({ ...data, "siteName": text })}
          style={styles.input}
        />

        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder='Enter Client Name'
          value={data.client}
          onChangeText={(text) => setData({ ...data, "client": text })}
          style={styles.input}
        />

        <Text style={styles.label}>Contact</Text>
        <TextInput
          placeholder='Enter Contact Number'
          value={data.contact}
          onChangeText={(text) => setData({ ...data, "contact": text })}
          style={styles.input}
        />

        <Text style={styles.label}>Notes</Text>

        <TextInput
          placeholder='Enter notes'
          value={data.notes}
          onChangeText={(text) => setData({ ...data, "notes": text })}
          style={styles.textArea}
        />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {["High", "Medium", "Low"].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.priorityButton,
                data.priority === item && styles.selectedPriority,
              ]}
              onPress={() => setData({ ...data, "priority": item })}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Survey Date</Text>

        <TextInput
          value={formattedDate}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        {address && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Accuracy: {location.accuracy?.toFixed(2)} m</Text>
            <Text style={styles.infoText}>Latitude: {location.latitude}</Text>
            <Text style={styles.infoText}>Longitude: {location.longitude}</Text>
            <Text style={styles.infoText}>Name: {address.name}</Text>
            <Text style={styles.infoText}>City: {address.city}</Text>
            <Text style={styles.infoText}>Country: {address.country}</Text>
          </View>
        )}

        <Pressable
          style={styles.locationButton}
          onPress={getCurrentLocation}
        >
          <Text style={styles.buttonText}>
            {location ? "Refresh Location" : "Get Current Location"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Survey</Text>
        </Pressable>

      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },

  disabledInput: {
    backgroundColor: "#E5E7EB",
    color: "#555",
  },

  textArea: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 15,
    height: 110,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 18,
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  priorityButton: {
    flex: 1,
    backgroundColor: "#D1D5DB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },

  selectedPriority: {
    backgroundColor: "#4F46E5",
  },

  priorityText: {
    color: "#333",
    fontWeight: "600",
  },

  selectedPriorityText: {
    color: "#FFFFFF",
  },

  infoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 18,
  },

  infoText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },

  locationButton: {
    backgroundColor: "#10B981",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 2,
  },

  submitButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});


export default CreateSurveyScreen
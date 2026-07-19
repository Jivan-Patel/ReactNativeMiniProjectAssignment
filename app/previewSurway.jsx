import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";

const SurveyPreview = () => {
  const survey = {
    surveyId: "SUR-001",
    siteDetails: "AS Construction Site",
    client: "Aditya Patel",
    contact: "7896598976",
    location: "Kalol, Gujarat",
    notes: "Raste ka plot saste me",
    photo: "https://picsum.photos/500/300",
  };

  const editSurvey = () => {
    Alert.alert("Edit Survey", "Navigate to the Create Survey screen.");
  };

  const submitSurvey = () => {
    Alert.alert("Success", "Survey submitted successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Survey Preview</Text>

      <Image
        source={{ uri: survey.photo }}
        style={styles.image}
      />

      <View style={styles.card}>
        <View style={styles.item}>
          <Text style={styles.label}>Survey ID</Text>
          <Text style={styles.value}>{survey.surveyId}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Site Details</Text>
          <Text style={styles.value}>{survey.siteDetails}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Client</Text>
          <Text style={styles.value}>{survey.client}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>{survey.contact}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{survey.location}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{survey.notes}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.editButton]}
          onPress={editSurvey}
        >
          <Text style={styles.buttonText}>Edit Survey</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.submitButton]}
          onPress={submitSurvey}
        >
          <Text style={styles.buttonText}>Submit Survey</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SurveyPreview;

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

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginBottom: 20,
  },

  item: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 4,
  },

  value: {
    fontSize: 16,
    color: "#111827",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 30,
  },

  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  editButton: {
    backgroundColor: "#F59E0B",
  },

  submitButton: {
    backgroundColor: "#10B981",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
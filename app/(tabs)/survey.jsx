import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const CreateSurveyScreen = () => {

  const surveyData = {
    surveyId: "SUR-105",
    siteName: "",
    clientName: "",
    description: "",
    priority: "Medium",
    date: new Date(),
    notes: "",
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


  const [data, setData] = useState(surveyData);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleSubmit = () => {
    if (!data.siteName.trim()) {
      Alert.alert("Validation", "Please enter Site Name");
      return;
    }

    if (!data.clientName.trim()) {
      Alert.alert("Validation", "Please enter Client Name");
      return;
    }

    if (!data.description.trim()) {
      Alert.alert("Validation", "Please enter Description");
      return;
    }

    if (!data.priority) {
      Alert.alert("Validation", "Please select Priority");
      return;
    }

    Alert.alert("Success", "Survey created successfully!");

    setData({
      ...surveyData,
      date: new Date(),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Create new survey</Text>


      <Text style={styles.label}>Survey ID</Text>
      <TextInput
        placeholder='Enter Site Name'
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
        value={data.clientName}
        onChangeText={(text) => setData({ ...data, "clientName": text })}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        placeholder='Enter description'
        value={data.description}
        onChangeText={(text) => setData({ ...data, "description": text })}
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

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    marginBottom: 15,
  },

  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#a9a5a5",
  },

  selectedPriority: {
    backgroundColor: "#4F46E5",
  },

  priorityText: {
    color: "#222",
    fontWeight: "600",
  },

  selectedPriorityText: {
    color: "#fff",
  },

  dateBox: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default CreateSurveyScreen
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";

const SurveyHistory = () => {
  const [surveys, setSurveys] = useState([
    {
      id: "1",
      site: "GIFT City Project",
      client: "Rahul Patel",
      priority: "High",
      contact: "9876543210",
      location: "Gandhinagar",
      date: "19 Jul 2026",
    },
    {
      id: "2",
      site: "Sabarmati Riverfront",
      client: "Priya Shah",
      priority: "Medium",
      contact: "9876501234",
      location: "Ahmedabad",
      date: "18 Jul 2026",
    },
    {
      id: "3",
      site: "Statue of Unity",
      client: "Amit Kumar",
      priority: "Low",
      contact: "9876545678",
      location: "Kevadia",
      date: "17 Jul 2026",
    },
    {
      id: "4",
      site: "Surat Diamond Bourse",
      client: "Neha Mehta",
      priority: "High",
      contact: "9876541111",
      location: "Surat",
      date: "16 Jul 2026",
    },
    {
      id: "5",
      site: "Dholera Smart City",
      client: "Vikram Singh",
      priority: "Medium",
      contact: "9876542222",
      location: "Dholera",
      date: "15 Jul 2026",
    },
    {
      id: "6",
      site: "Atal Bridge",
      client: "Karan Joshi",
      priority: "Low",
      contact: "9876543333",
      location: "Ahmedabad",
      date: "14 Jul 2026",
    },
  ]);

  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");

  useEffect(() => {
    let data = surveys;

    if (priority !== "All") {
      data = data.filter((item) => item.priority === priority);
    }

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.site.toLowerCase().includes(search.toLowerCase()) ||
          item.client.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredSurveys(data);
  }, [search, priority, surveys]);

  const viewSurvey = (survey) => {
    Alert.alert(
      "Survey Details",
      `Site: ${survey.site}
Client: ${survey.client}
Priority: ${survey.priority}
Contact: ${survey.contact}
Location: ${survey.location}
Date: ${survey.date}`
    );
  };

  const deleteSurvey = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setSurveys((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Survey History</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by Site or Client"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {["All", "High", "Medium", "Low"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              priority === item && styles.activeFilter,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={[
                styles.filterText,
                priority === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredSurveys}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.site}>{item.site}</Text>
              <Text style={styles.text}>Client: {item.client}</Text>
              <Text style={styles.text}>Priority: {item.priority}</Text>
              <Text style={styles.text}>Date: {item.date}</Text>
            </View>

            <View>
              <Pressable
                style={styles.viewButton}
                onPress={() => viewSurvey(item)}
              >
                <Text style={styles.buttonText}>View</Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteSurvey(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SurveyHistory;

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

  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#4F46E5",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  activeFilter: {
    backgroundColor: "#4F46E5",
  },

  filterText: {
    color: "#4F46E5",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#fff",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  info: {
    flex: 1,
  },

  site: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },

  viewButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
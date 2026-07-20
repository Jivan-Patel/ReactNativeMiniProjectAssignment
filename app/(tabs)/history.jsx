import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, Pressable, Alert, } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SurveyHistory = () => {
  const [surveys, setSurveys] = useState([]);
  const [filteredSurveys, setFilteredSurveys] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");

  useFocusEffect(
    useCallback(() => {
      const fetchSurveys = async () => {
        try {
          const storedSurveys = await AsyncStorage.getItem("surveys");

          if (storedSurveys) {
            const parsed = JSON.parse(storedSurveys);
            setSurveys(parsed);
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

  useEffect(() => {
    let data = [...surveys];

    if (priority !== "All") {
      data = data.filter((item) => item.priority === priority);
    }

    if (search.trim()) {
      data = data.filter(
        (item) =>
          item.siteName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.client
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.surveyId
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    setFilteredSurveys(data);
  }, [search, priority, surveys]);

  const viewSurvey = (survey) => {
    Alert.alert(
      "Survey Details",
      `Survey ID: ${survey.surveyId}

Site: ${survey.siteName}

Client: ${survey.client}

Contact: ${survey.contact}

Priority: ${survey.priority}

Location: ${survey.location}

Notes: ${survey.notes}

Date: ${new Date(survey.date).toLocaleDateString()}`
    );
  };

  const deleteSurvey = (surveyId) => {
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
          onPress: async () => {
            const updated = surveys.filter(
              (item) => item.surveyId !== surveyId
            );

            setSurveys(updated);

            await AsyncStorage.setItem(
              "surveys",
              JSON.stringify(updated)
            );
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
        placeholder="Search by Survey ID, Site or Client"
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
        keyExtractor={(item) => item.surveyId}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No surveys found.
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.site}>
                {item.siteName}
              </Text>

              <Text style={styles.text}>
                Survey ID: {item.surveyId}
              </Text>

              <Text style={styles.text}>
                Client: {item.client}
              </Text>

              <Text style={styles.text}>
                Contact: {item.contact}
              </Text>

              <Text style={styles.text}>
                Priority: {item.priority}
              </Text>

              <Text style={styles.text}>
                Date:{" "}
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>

            <View>
              <Pressable
                style={styles.viewButton}
                onPress={() => viewSurvey(item)}
              >
                <Text style={styles.buttonText}>
                  View
                </Text>
              </Pressable>

              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  deleteSurvey(item.surveyId)
                }
              >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },

  info: {
    flex: 1,
    marginRight: 12,
  },

  site: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
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

  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
});
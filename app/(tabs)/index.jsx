import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();

  const data = {
    student: {
      name: "Patel Jivan",
      enrollment: "SUK250054CE107",
      branch: "Computer Engineering",
      semester: "Semester 3",
      college: "Swaminarayan University",
    },

    todaySurveyCount: 8,

    quickActions: [
      {
        id: 1,
        title: "New Survey",
        icon: "clipboard-text",
        screen: "survey",
        color: "#4F46E5",
      },
      {
        id: 2,
        title: "Camera",
        icon: "camera",
        screen: "camera",
        color: "#EF4444",
      },
      {
        id: 3,
        title: "Location",
        icon: "map-marker",
        screen: "location",
        color: "#10B981",
      },
      {
        id: 4,
        title: "Contacts",
        icon: "account-group",
        screen: "contacts",
        color: "#F59E0B",
      },
    ],

    stats: {
      totalSurveys: 128,
      completed: 112,
      pending: 12,
      highPriority: 4,
    },

    recentSurveys: [
      {
        id: "SUR-101",
        siteName: "Metro Bridge Site",
        client: "Larsen & Toubro",
        priority: "High",
        status: "Completed",
        date: "Today • 09:15 AM",
      },
      {
        id: "SUR-102",
        siteName: "Solar Plant",
        client: "Adani Green",
        priority: "Medium",
        status: "Pending",
        date: "Today • 11:40 AM",
      },
      {
        id: "SUR-103",
        siteName: "Highway Expansion",
        client: "NHAI",
        priority: "High",
        status: "Completed",
        date: "Yesterday",
      },
      {
        id: "SUR-104",
        siteName: "Residential Tower",
        client: "Shapoorji Pallonji",
        priority: "Low",
        status: "Completed",
        date: "Yesterday",
      },
    ],

    notifications: [
      {
        id: 1,
        title: "New survey assigned",
        time: "10 mins ago",
      },
      {
        id: 2,
        title: "Location synced successfully",
        time: "1 hour ago",
      },
    ],
  };

  const [recentSurveys, setRecentSurveys] = useState([]);

  const loadSurvey = async () => {
    try {
      const storedSurvey = await AsyncStorage.getItem("surveys");
      if (storedSurvey) {
        const parsedSurvey = JSON.parse(storedSurvey);

        setRecentSurveys(parsedSurvey.reverse().slice(0, 5));
      }
    } catch (error) {
      console.error("Error loading survey:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadSurvey();
    }, [])
  );




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <MaterialIcons name="menu" size={28} color="black" />
          </Pressable>

          <Text style={styles.headerTitle}>Smart Survey</Text>

          <Pressable>
            <MaterialIcons name="notifications-none" size={28} color="black" />
          </Pressable>
        </View>

        {/* Welcome Screen */}
        <View style={styles.subcontainer}>
          <Text style={styles.welcomeText}>Welcome {data.student.name}</Text>
        </View>

        {/* Student Details */}
        <View style={styles.subcontainer}>
          <Text style={styles.heading}>Student Details</Text>
          <Text>Name: {data.student.name}</Text>
          <Text>Enrollment ID: {data.student.enrollment}</Text>
          <Text>Branch: {data.student.branch}</Text>
          <Text>Semester: {data.student.semester}</Text>
          <Text>College: {data.student.college}</Text>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.subcontainer}>
          <Text style={styles.subTitle}>Today's Survey</Text>
          <Text>{data.todaySurveyCount}</Text>
        </View>

        {/* Quick Action Cards */}
        <View style={styles.quickActionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <FlatList
            data={data.quickActions}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.quickAction,
                  { backgroundColor: item.color },
                  pressed && { opacity: 0.85, transform: [{ scale: 0.97 }] }
                ]}
                onPress={() => router.push(`/${item.screen}`)}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Recent Survey Summary */}
        <View>
          <Text style={[{ paddingLeft: 20 }, styles.sectionTitle]}>Recent Survey</Text>
          <FlatList
            data={recentSurveys}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.surveyCard}>
                <View style={styles.surveyHeader}>
                  <Text style={styles.site}>{item.siteName}</Text>

                  <View
                    style={[
                      styles.priorityBadge,
                      item.priority === "High"
                        ? styles.highPriority
                        : item.priority === "Medium"
                          ? styles.mediumPriority
                          : styles.lowPriority,
                    ]}
                  >
                    <Text style={styles.priorityText}>
                      {item.priority}
                    </Text>
                  </View>
                </View>

                <Text style={styles.info}>
                  Survey ID: {item.surveyId}
                </Text>

                <Text style={styles.info}>
                  Client: {item.client}
                </Text>

                <Text style={styles.info}>
                  Contact: {item.contact}
                </Text>

                <Text style={styles.info} numberOfLines={1}>
                  📍 {item.location}
                </Text>

                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>
            )}

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },

  subcontainer: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4F46E5",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 15,
    paddingHorizontal: 5,
  },

  quickActionContainer: {
    marginHorizontal: 15,
    marginTop: 25,
  },

  row: {
    justifyContent: "space-between",
  },

  quickAction: {
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  actionTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  surveyCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  site: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 5,
  },

  surveyHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

info: {
  fontSize: 14,
  color: "#555",
  marginBottom: 4,
},

date: {
  marginTop: 10,
  fontSize: 13,
  color: "#888",
},

priorityBadge: {
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 20,
},

highPriority: {
  backgroundColor: "#FEE2E2",
},

mediumPriority: {
  backgroundColor: "#FEF3C7",
},

lowPriority: {
  backgroundColor: "#DCFCE7",
},

priorityText: {
  fontSize: 12,
  fontWeight: "700",
  color: "#111827",
},
});

export default HomeScreen
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

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
        <View>
          <FlatList
            data={data.quickActions}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.quickAction, { backgroundColor: item.color }]}
                onPress={() => router.push(`/${item.screen}`)}
              >
                <Text style={styles.actionTitle}>{item.title}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Recent Survey Summary */}
        <View>
          <FlatList
            data={data.recentSurveys}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.surveyCard}>
                <Text style={styles.site}>{item.siteName}</Text>
                <Text>{item.client}</Text>
                <Text>{item.priority}</Text>
                <Text>{item.status}</Text>
                <Text>{item.date}</Text>
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

  row: {
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 15,
  },

  quickAction: {
    width: "48%",
    height: 120,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  actionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
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
});

export default HomeScreen
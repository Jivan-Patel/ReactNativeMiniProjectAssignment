import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>Patel Jivan</Text>
        <Text style={styles.role}>Student Surveyor</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Enrollment ID:</Text>
        <Text style={styles.infoText}>SUK250054CE107</Text>
        
        <Text style={styles.infoLabel}>Branch:</Text>
        <Text style={styles.infoText}>Computer Engineering</Text>
        
        <Text style={styles.infoLabel}>College:</Text>
        <Text style={styles.infoText}>Swaminarayan University</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    backgroundColor: '#4F46E5',
    padding: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  role: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 15,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  }
})

export default ProfileScreen
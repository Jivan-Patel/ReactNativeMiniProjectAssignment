import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';


const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert("Location Access Denied", "Please allow location permission to use this feature")
      return;
    }

    setLoading(true);
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(currentLocation.coords);

      const reverseGeocode = await Location.reverseGeocodeAsync(currentLocation.coords);
      setAddress(reverseGeocode[0]);
      console.log("Reverse Geocode Result:", reverseGeocode[0]);


    } catch (error) {
      Alert.alert("Error", "Could not fetch location. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = async () => {
    if (!location) return;

    const text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied!", "Current location copied to clipboard")
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>Location</Text>

      {loading && <ActivityIndicator size="large" style={style.loader} />}

      {location && !loading && (
        <View style={style.infoBox}>
          <Text style={style.infoText}>Latitude: {location.latitude}</Text>
          <Text style={style.infoText}>Longitude: {location.longitude}</Text>
          <Text style={style.infoText}>Accuracy: {location.accuracy?.toFixed(2)} m</Text>
        </View>
      )}

      {address && !loading && (
        <View style={style.infoBox}>
          <Text style={style.infoText}>Name: {address.name}</Text>
          <Text style={style.infoText}>City: {address.city}</Text>
          <Text style={style.infoText}>Country: {address.country}</Text>
        </View>
      )}

      <Pressable style={style.button} onPress={getCurrentLocation} disabled={loading}>
        <Text style={style.buttonText}>
          {location ? "Refresh Location" : "Get Current Location"}
        </Text>
      </Pressable>

      {location && (
        <Pressable style={style.button} onPress={copyToClipboard}>
          <Text style={style.buttonText}>Copy Location to Clipboard</Text>
        </Pressable>
      )}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
  },
  loader: {
    margin: 20,
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    margin: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  }
})

export default LocationScreen;

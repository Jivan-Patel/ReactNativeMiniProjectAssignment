import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Pressable,
    Alert,
} from "react-native";
import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";

const ClipboardScreen = () => {
    const [surveyId] = useState("SUR-105");
    const [contactNumber] = useState("9876543210");
    const [location] = useState("23.0225, 72.5714");
    const [notes, setNotes] = useState("");

    const copySurveyId = async () => {
        await Clipboard.setStringAsync(surveyId);
        Alert.alert("Success", "Survey ID copied successfully!");
    };

    const copyContactNumber = async () => {
        await Clipboard.setStringAsync(contactNumber);
        Alert.alert("Success", "Contact Number copied successfully!");
    };

    const copyLocation = async () => {
        await Clipboard.setStringAsync(location);
        Alert.alert("Success", "Current Location copied successfully!");
    };

    const pasteNotes = async () => {
        const value = await Clipboard.getStringAsync();
        setNotes(value);
    };

    const clearClipboard = async () => {
        await Clipboard.setStringAsync("");
        setNotes("");
        Alert.alert("Success", "Clipboard cleared successfully!");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Clipboard</Text>

            <Text style={styles.label}>Survey ID</Text>
            <TextInput
                value={surveyId}
                editable={false}
                style={[styles.input, styles.disabledInput]}
            />

            <Pressable style={styles.button} onPress={copySurveyId}>
                <Text style={styles.buttonText}>Copy Survey ID</Text>
            </Pressable>

            <Text style={styles.label}>Contact Number</Text>
            <TextInput
                value={contactNumber}
                editable={false}
                style={[styles.input, styles.disabledInput]}
            />

            <Pressable style={styles.button} onPress={copyContactNumber}>
                <Text style={styles.buttonText}>Copy Contact Number</Text>
            </Pressable>

            <Text style={styles.label}>Current Location</Text>
            <TextInput
                value={location}
                editable={false}
                style={[styles.input, styles.disabledInput]}
            />

            <Pressable style={styles.button} onPress={copyLocation}>
                <Text style={styles.buttonText}>Copy Current Location</Text>
            </Pressable>

            <Text style={styles.label}>Notes</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Paste notes here..."
                multiline
                value={notes}
                onChangeText={setNotes}
            />

            <View style={styles.row}>
                <Pressable
                    style={[styles.bottomButton, styles.primaryButton]}
                    onPress={pasteNotes}
                >
                    <Text style={styles.buttonText}>Paste Notes</Text>
                </Pressable>

                <Pressable
                    style={[styles.bottomButton, styles.dangerButton]}
                    onPress={clearClipboard}
                >
                    <Text style={styles.buttonText}>Clear</Text>
                </Pressable>
            </View>
        </View>
    );
};

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
        marginBottom: 6,
    },

    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 12,
    },

    disabledInput: {
        backgroundColor: "#E5E7EB",
        color: "#555",
    },

    textArea: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        padding: 12,
        height: 100,
        textAlignVertical: "top",
        marginBottom: 20,
        fontSize: 16,
    },

    button: {
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },

    bottomButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButton: {
        backgroundColor: "#4F46E5",
    },

    dangerButton: {
        backgroundColor: "#EF4444",
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default ClipboardScreen;
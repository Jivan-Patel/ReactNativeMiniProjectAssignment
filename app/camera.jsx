import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native'
import React, { useState, useRef } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera'

const Camera = () => {
    const cameraRef = useRef(null); // camera reference
    const [facing, setFacing] = useState("back"); // use to flip camera
    const [permission, requestPermission] = useCameraPermissions(); // for permission
    const [photo, setPhoto] = useState(null); // save the photo

    const [isLoading, setLoading] = useState(false);

    const [captureTime, setCaptureTime] = useState(0);


    const takePic = async () => {
        const time = Date.now();
        setLoading(true);
        try {
            const result = await cameraRef.current?.takePictureAsync();

            if (result) {
                setPhoto(result.uri);
            }
        }
        finally {
            setLoading(false);
            const totalTime = Date.now() - time;
            setCaptureTime(totalTime / 1000);
        }
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Photo",
            "Are you sure you want to delete this photo?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                        setPhoto(null);
                    },
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    if (!permission) {
        return (
            <View style={styles.loadingContainer}>
                <Image
                    style={styles.gif}
                    source={{
                        uri: "https://media.tenor.com/vNB3iUXsxnQAAAAC/loading-gif.gif"
                    }}
                />
            </View>
        )
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {photo ? (
                <View style={styles.previewContainer}>
                    <Image
                        source={{ uri: photo }}
                        style={styles.pic}
                    />

                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>📸 Photo Captured</Text>
                        <Text style={styles.captureText}>
                            Capture Time: {captureTime.toFixed(2)} s
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Retake Photo"
                            onPress={() => setPhoto(null)}
                        />
                        <Button
                            title="Delete Photo"
                            onPress={handleDelete}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.cameraContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.camera}
                        facing={facing}
                        onCameraReady={() => setLoading(false)}
                    />

                    {isLoading && (
                        <View style={styles.loadingOverlay}>
                            <Image
                                source={{
                                    uri: "https://media.tenor.com/vNB3iUXsxnQAAAAC/loading-gif.gif",
                                }}
                                style={styles.gif}
                            />
                        </View>
                    )}

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Flip Camera"
                            onPress={() =>
                                setFacing(prev =>
                                    prev === "back" ? "front" : "back"
                                )
                            }
                        />

                        <Button
                            title="Take Photo"
                            onPress={takePic}
                        />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    cameraContainer: {
        flex: 1,
    },

    camera: {
        flex: 1,
    },

    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        gap: 12,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        elevation: 8,
    },

    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    pic: {
        width: "100%",
        height: "70%",
        borderRadius: 20,
        marginBottom: 20,
    },

    infoCard: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 5,
    },

    infoTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
        color: "#222",
    },

    captureText: {
        fontSize: 16,
        color: "#555",
        fontWeight: "600",
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },

    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.9)",
        zIndex: 100,
        elevation: 100,
    },

    gif: {
        width: 180,
        height: 180,
    },
});

export default Camera;
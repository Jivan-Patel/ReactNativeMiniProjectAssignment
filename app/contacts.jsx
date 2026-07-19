import { View, Text, Button, Alert, FlatList, StyleSheet, TextInput, Image, Pressable, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react';
import * as Contacts from "expo-contacts"
import * as Clipboard from "expo-clipboard"

const ContactScreen = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContact, setFilteredContact] = useState([]);
    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== "granted") {
            Alert.alert("Access Denied", "Please allow contacts permission.");
            return;
        }

        const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.Fields.PhoneNumbers,
                Contacts.Fields.Image,
            ],
        });

        setContacts(data);
    };

    const copyContact = async (id) => {
        const contact = contacts.find((c) => c.id === id);
        if (!contact) return;

        const number = contact.phoneNumbers?.[0]?.number;

        if (!number) {
            Alert.alert("No Number", "This contact doesn't have a phone number.");
            return;
        }

        await Clipboard.setStringAsync(number);
        Alert.alert("Success", "Contact copied to clipboard!");
    };

    useEffect(() => {
        const filterCon = contacts.filter((contact) => {
            const name = (contact.name ?? "").toLowerCase();
            const number = contact.phoneNumbers?.[0]?.number ?? "";

            return (
                name.includes(search.toLowerCase()) ||
                number.includes(search)
            );
        });

        setFilteredContact(filterCon);
    }, [search, contacts]);

    const onRefresh = async () => {
        setRefreshing(true);
        await getContacts();
        setRefreshing(false);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Contacts</Text>

            {
                contacts.length == 0 && (
                    <Pressable style={styles.getBtn} onPress={getContacts}>
                        <Text style={styles.getBtnText}>Get Contacts</Text>
                    </Pressable>
                )
            }
            {
                contacts.length > 0 && (
                    <>
                        <View style={styles.countCard}>
                            <Text style={styles.countTitle}>Total Contacts</Text>
                            <Text style={styles.countNumber}>{contacts.length}</Text>
                        </View>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Contacts"
                            placeholderTextColor="#888"
                            onChangeText={setSearch}
                            value={search}
                        />
                    </>
                )
            }


            {
                contacts.length > 0 && filteredContact.length == 0 && (
                    <View style={styles.noContacts}>
                        <Text style={styles.noContactsText}>No Contacts Found</Text>
                    </View>
                )
            }

            <FlatList
                data={filteredContact}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {item.imageAvailable ? (
                            <Image
                                source={{ uri: item.image?.uri }}
                                style={styles.image}
                            />
                        ) : (
                            <View style={styles.placeholder}>
                                <Text style={styles.placeholderText}>
                                    {item.name?.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.number}>
                                {item.phoneNumbers?.[0]?.number || "No Number"}
                            </Text>
                        </View>

                        <Pressable style={styles.copyButton} onPress={() => copyContact(item.id)}>
                            <Text style={styles.copyButtonText}>Copy</Text>
                        </Pressable>

                    </View>
                )}
            />

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
        marginBottom: 15,
    },
    getBtn: {
        alignSelf: "center",
        backgroundColor: "#4F46E5",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
    },

    getBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    searchInput: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginVertical: 15,
    },

    list: {
        paddingBottom: 20,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    image: {
        width: 55,
        height: 55,
        borderRadius: 30,
    },

    placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: "#4F46E5",
        justifyContent: "center",
        alignItems: "center",
    },

    placeholderText: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
    },

    info: {
        flex: 1,
        marginLeft: 15,
    },

    name: {
        fontSize: 17,
        fontWeight: "700",
        color: "#222",
    },

    number: {
        marginTop: 4,
        fontSize: 14,
        color: "#666",
    },

    copyButton: {
        backgroundColor: "#4F46E5",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },

    copyButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },

    countCard: {
        backgroundColor: "#4F46E5",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        marginVertical: 15,
    },

    countTitle: {
        color: "#E5E7EB",
        fontSize: 14,
        fontWeight: "600",
    },

    countNumber: {
        color: "#FFFFFF",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 5,
    },

    noContacts: {
        alignSelf: "center",
        marginTop: 50,
    },

    noContactsText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#222",
    },
});


export default ContactScreen;
import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export const FilterTypeModal: React.FC<IFilterModalProps> = ({ modalVisible, setModalVisible, handleTypeSelect }) => {
    const pokemonTypes = ["fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Pokémon Type</Text>
                    {pokemonTypes.map((type) => (
                        <TouchableOpacity key={type} onPress={() => handleTypeSelect(type)}>
                            <Text style={styles.modalItem}>{type}</Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

 
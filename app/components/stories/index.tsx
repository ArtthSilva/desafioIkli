import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";
import { getRandomColor } from "../../utils/randomColor";

interface StorieIconProps {
    imageUrl: string;
    size?: number;
    pokemonName?: string;
    paddingBottom?: number;
}
const StorieIcon: React.FC<StorieIconProps> = ({ imageUrl, size = 60, pokemonName, paddingBottom = 50 }) => {
    const backgroundColor = getRandomColor();

    return (
        <View style={[styles.story, { paddingBottom }]}>
            <View style={[styles.container, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2, backgroundColor }]}>
                <Image source={{ uri: imageUrl }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
            </View>
            <Text style={{ color: "#fff" }}>{pokemonName}</Text>
        </View>
    );
};

export default StorieIcon;

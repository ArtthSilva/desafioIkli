import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface StorieIconProps {
    imageUrl: string;
    size?: number;
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const StorieIcon: React.FC<StorieIconProps> = ({ imageUrl, size = 60 }) => {
    const backgroundColor = getRandomColor();

    return (
        <View style={[styles.container, { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2, backgroundColor }]}>
            <Image source={{ uri: imageUrl }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: '#f7b55a',  
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12, 
    },
    image: {
        resizeMode: 'cover',
    },
});

export default StorieIcon;

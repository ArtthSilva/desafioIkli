import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button, FlatList, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { propsStack, ProfileRouteProp } from "../../../routes/types";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StorieIcon from "../../../components/stories";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { IPokemon } from "../../../interfaces/pokemon.interface";
import { pokemonApi } from "../../../services/PokemonApi";
import { styles } from "./styles";
import { getRandomColor } from "../../../utils/randomColor";
import { isFavorite, toggleFavorite } from "../../../utils/favoritePokemon";

export default function Profile() {
    const params = useRoute<ProfileRouteProp>();
    const navigation = useNavigation<propsStack>();
    const [profileData, setProfileData] = useState<IPokemon | null>(null);
    const [error, setError] = useState<string | null>(null);
    const pokemonId = params.params.id;
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);   
    const backgroundColorImage = getRandomColor();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const data = await pokemonApi.getPokemonById(pokemonId);  
                setProfileData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do perfil:', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };
        checkFavoriteStatus();   
        fetchProfileData();
    }, [pokemonId]);

    const checkFavoriteStatus = async () => {
        const isFav = await isFavorite(pokemonId);
        setFavorite(isFav);   
    };

    const handleToggleFavorite = async () => {
        await toggleFavorite(pokemonId, favorite);  
        setFavorite(!favorite);  
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.profile}>
                <Text style={styles.profile__loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.profile}>
                <Text style={styles.profile__loadingText}>{error}</Text>
            </SafeAreaView>
        );
    }

    if (!profileData) {
        return null;
    }
    const pokemonImages = [
        profileData.sprites.front_default,
        profileData.sprites.back_default,
        profileData.sprites.front_shiny,
        profileData.sprites.back_shiny,

    ].filter(Boolean);  

    return (
        <SafeAreaView style={styles.profile}>
            <View style={styles.profile__header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.profile__headerText}><MaterialIcons name="verified" size={24} color="blue" /> {profileData.name}</Text>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
            </View>
            <View style={styles.profile__info}>
                <View style={styles.profile__info__image}>
                    <StorieIcon
                        imageUrl={profileData.sprites.front_default}
                        size={70}
                    />
                </View>
                <View style={styles.profile__stats}>
                    <View style={styles.profile__stat}>
                        <Text style={styles.profile__statInfo}>{profileData.height}</Text>
                        <Text style={styles.profile__statLabel}>Height</Text>
                    </View>
                    <View style={styles.profile__stat}>
                        <Text style={styles.profile__statInfo}>{profileData.weight}</Text>
                        <Text style={styles.profile__statLabel}>Weight</Text>
                    </View>
                    <View style={styles.profile__stat}>
                        <Text style={styles.profile__statInfo}>
                            {profileData.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat ?? 'N/A'}
                        </Text>
                        <Text style={styles.profile__statLabel}>Special Attack</Text>
                    </View>
                </View>
            </View>
            <View style={styles.profile__favoriteButtonContainer}>
                <TouchableOpacity 
                onPress={handleToggleFavorite}
                style={[
                    styles.profile__favoriteButton, 
                    { backgroundColor: favorite ? 'red' : '#1FA1FF' }
                ]}>
                    <Text style={styles.profile__favoriteButtonText}>{favorite ? 'Unfavorite' : 'Favorite'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profile__gridIconContainer}>
                <MaterialCommunityIcons name="grid" size={24} color="white" />
            </View>

            <FlatList
                data={pokemonImages}
                numColumns={3}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.gridItem}>
                        <Image source={{ uri: item! }} style={[styles.image, { backgroundColor: backgroundColorImage }]} />
                    </View>
                )}
                contentContainerStyle={styles.grid}
            />
        </SafeAreaView>
    );
}

import { View, Text, Image, TouchableOpacity } from "react-native";
import StorieIcon from "../../../../components/stories";
import { propsStack } from "../../../../routes/types";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { getRandomColor } from "../../../../utils/randomColor";

export const Publication: React.FC<IPublicationProps> = ({
    imagePublication,
    typePokemon,
    pokemonName,
    pokemonProfileImg,
    pokemonId,
}) => {
    const backgroundColor = getRandomColor();
    const navigation = useNavigation<propsStack>();  
 

    return (
        <View style={styles.publication}>
            <View style={styles.publicationHeader}>
                <View>
                    <StorieIcon imageUrl={pokemonProfileImg} size={40} paddingBottom={0} />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile', { id: pokemonId })}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.pokemonName}>{pokemonName}</Text>
                        <Text style={styles.typePokemon}>{typePokemon}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: backgroundColor }}>
                <Image
                    source={{ uri: imagePublication }}
                    style={styles.publicationImage}
                />
            </View>
        </View>
    );
};

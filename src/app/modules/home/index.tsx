import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function Home() {
    return (
        <ScrollView style={styles.home}>
            <View style={styles.stories}>
                {/* Stories section */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={styles.story}>
                        <Image
                            source={{ uri: `https://via.placeholder.com/150?text=Story+${index + 1}` }}
                            style={styles.storyImage}
                        />
                    </View>
                ))}
            </View>
            <View style={styles.feed}>
                {/* Feed section */}
                {Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={styles.post}>
                        <Image
                            source={{ uri: `https://via.placeholder.com/600?text=Post+${index + 1}` }}
                            style={styles.postImage}
                        />
                        <View style={styles.postContent}>
                            <Text style={styles.postTitle}>Post {index + 1}</Text>
                            <Text style={styles.postText}>This is the content of post {index + 1}.</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        backgroundColor: '#fff',
    },
    stories: {
        flexDirection: 'row',
        padding: 10,
    },
    story: {
        marginRight: 10,
    },
    storyImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    feed: {
        padding: 10,
    },
    post: {
        marginBottom: 20,
    },
    postImage: {
        width: '100%',
        height: 300,
    },
    postContent: {
        padding: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    postText: {
        fontSize: 14,
    },
});

 
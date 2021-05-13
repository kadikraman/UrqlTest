import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { useQuery } from 'urql';

const ArtQuery = `
  query getArtworks {
    artworks {
      id
      image {
        image_url
      }
      artist {
        name
      }
    }
  }
`;

const HomeScreen = ({ navigation }) => {
  const [result] = useQuery({
    query: ArtQuery,
  });

  const { data, fetching, error } = result;
  if (fetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Oh no... {error.message}</Text>;
  }

  return (
    <FlatList
      style={styles.list}
      data={data.artworks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate('ArtDetail', { id: item.id })}>
          <FadeIn>
            <Image
              style={styles.image}
              source={{
                uri: item.image.image_url.replace(':version', 'medium'),
              }}
            />
          </FadeIn>
          <Text>By {item.artist.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { backgroundColor: 'white' },
  touchable: { alignItems: 'center', marginBottom: 20 },
  image: { height: 200, width: 200, margin: 20 },
});

export default HomeScreen;

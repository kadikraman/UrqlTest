import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { useQuery, gql } from 'urql';

const ArtQuery = gql`
  query getArtworks {
    artworksConnection(first: 10) {
      id
      edges {
        node {
          slug
          image {
            imageURL
          }
          artist {
            id
            name
          }
        }
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
      data={
        data && data.artworksConnection ? data.artworksConnection.edges : []
      }
      keyExtractor={(item) => item.node.slug}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() =>
            navigation.navigate('ArtDetail', {
              slug: item.node.slug,
            })
          }>
          <FadeIn>
            <Image
              style={styles.image}
              source={{
                uri: item.node.image.imageURL.replace(':version', 'medium'),
              }}
            />
          </FadeIn>
          <Text>By {item.node.artist.name}</Text>
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

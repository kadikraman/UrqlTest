import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import { useQuery, gql } from 'urql';

const ArtQuery = gql`
  query getArtwork($id: String!) {
    artwork(id: $id) {
      id
      slug
      image {
        imageURL
      }
      artist {
        id
        name
        bio
      }
    }
  }
`;

const ArtDetailScreen = ({ route }) => {
  const [result] = useQuery({
    query: ArtQuery,
    variables: { id: route.params.id, slug: route.params.slug },
  });

  const { data, fetching, error } = result;

  if (fetching) {
    return <Text>Loading...</Text>;
  }

  if (error && !result.data) {
    return <Text>Oh no... {error.message}</Text>;
  }

  return (
    <View style={styles.page}>
      <FadeIn>
        <Image
          style={styles.image}
          source={{
            uri: data.artwork.image.imageURL.replace(':version', 'large'),
          }}
        />
      </FadeIn>
      <Text>By {data.artwork.artist.name}</Text>
      <Text style={styles.bio}>{data.artwork.artist.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: { height: 300, width: 300, margin: 20 },
  bio: {
    margin: 20,
    fontSize: 18,
  },
});

export default ArtDetailScreen;

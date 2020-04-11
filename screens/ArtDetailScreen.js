import React from 'react';
import { View, Text, Image } from 'react-native';
import { useQuery } from 'urql';

const ArtQuery = `
  query getArtwork($id: String!) {
    artwork(id: $id) {
      image {
        image_url
      }
      artist {
        name
      }
    }
  }
`;

const ArtDetailScreen = ({ route }) => {
  const [result] = useQuery({
    query: ArtQuery,
    variables: { id: route.params.id },
  });

  const { data, fetching, error } = result;
  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        style={{ height: 300, width: 300, margin: 20 }}
        source={{
          uri: data.artwork.image.image_url.replace(':version', 'large'),
        }}
      />
      <Text>By {data.artwork.artist.name}</Text>
    </View>
  );
};

export default ArtDetailScreen;

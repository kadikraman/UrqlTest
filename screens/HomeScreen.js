import React from 'react';
import { Image, Text, TouchableOpacity, FlatList } from 'react-native';
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
  if (fetching) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  return (
    <FlatList
      style={{ backgroundColor: 'white' }}
      data={data.artworks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{ alignItems: 'center', marginBottom: 20 }}
          onPress={() => navigation.navigate('ArtDetail', { id: item.id })}>
          <Image
            style={{ height: 200, width: 200, margin: 20 }}
            source={{ uri: item.image.image_url.replace(':version', 'medium') }}
          />
          <Text>By {item.artist.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default HomeScreen;

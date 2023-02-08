// Import React
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Import Firebase Database
import { firebase } from '@react-native-firebase/database';

// Import Constants
import { CUSTOM_COLORS } from 'src/common/constants/colors/customColors';

// Import utils
import { openMovieDetailPage } from 'src/common/utils/openMovieDetailPage';
import { fetchGenre } from 'src/common/utils/fetchGenre';

// Import i18next
import { t } from 'i18next';

// Import Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// Import Data Types
import { MovieListData } from 'src/screens/home/_types/movieListData';

// styles
import styles from 'src/assets/styles/MovieListItem.style';

interface MovieListItemProps {
  imgLink: string;
  title: string;
  genre: object | [];
  description: string;
  id: number;
  vote: number;
  movieKey: string;
  userID: string | undefined;
  navigation: any;
  movieList: MovieListData[];
}

function MovieListItem(props: MovieListItemProps): JSX.Element {
  // destruct props
  const { imgLink, title, genre, description, id, vote, movieKey, userID, navigation, movieList } = props;

  // useState
  const [fetchedGenre, setFetchedGenre] = useState<{id: number, name: string}>();

  // method for remove movie from my list
  const removeMovie = async () => {
    await firebase
      .app()
      .database('https://netflix-1b6c5-default-rtdb.europe-west1.firebasedatabase.app/')
      .ref('/users/' + userID + '/movies/' + movieKey)
      .remove();
  };

  useEffect(() => {
    if(Array.isArray(genre)) {
      // method for getting the genre name according to genre id
      const getGenre = async () => {
        setFetchedGenre(await fetchGenre(genre[0]));
      };

      getGenre();
    }
  }, [genre]);

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imgLink }} style={styles.image} />
        <TouchableOpacity style={styles.removeButton} onPress={() => removeMovie()}>
          <Text style={styles.buttonText}>{t('GLOBAL.COMPONENTS.BUTTON.TITLES.REMOVE')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          onPress={() => openMovieDetailPage(navigation, { title, genre, desc: description, imgLink, vote, id, userID, movieList })}
        >
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <Text style={styles.genre}>{fetchedGenre?.name ? fetchedGenre?.name : genre?.name}</Text>
          <View style={styles.vote}>
            <Icon name="star" color={CUSTOM_COLORS.YELLOW} size={20} />
            <Text style={styles.voteText}>{vote?.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

export default MovieListItem;

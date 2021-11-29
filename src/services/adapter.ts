import { Movie, MovieFromServer } from '../types/movie';
import { AuthInfo, AuthInfoFromServer } from '../types/auth';

export const adaptServerMovieToClient = (movie: MovieFromServer): Movie => ({
  id: movie['id'],
  name: movie['name'],
  description: movie['description'],
  rating: movie['rating'],
  director: movie['director'],
  starring: movie['starring'],
  genre: movie['genre'],
  released: movie['released'],
  posterImage: movie['poster_image'],
  previewImage: movie['preview_image'],
  backgroundImage: movie['background_image'],
  backgroundColor: movie['background_color'],
  videoLink: movie['video_link'],
  previewVideoLink: movie['preview_video_link'],
  scoresCount: movie['scores_count'],
  runTime: movie['run_time'],
  isFavorite: movie['is_favorite'],
});

export const adaptServerAuthInfoToClient = (authInfo: AuthInfoFromServer): AuthInfo => ({
  'id': authInfo['id'],
  'email': authInfo['email'],
  'name': authInfo['name'],
  'avatarUrl': authInfo['avatar_url'],
  'token': authInfo['token'],
});

import { Movie } from '../types/movie';
import { datatype, image, lorem, name, internet } from 'faker';

export const mockMovie = {
  backgroundColor: '',
  backgroundImage: '',
  description: '',
  genre: '',
  id: -1,
  isFavorite: false,
  name: '',
  posterImage: '',
  previewImage: '',
  previewVideoLink: '',
  rating: 0,
  released: 0,
  runTime: 0,
  scoresCount: 0,
  director: '',
  starring: [],
  videoLink: '',
};

export const createMockMovie = (): Movie => ({
  'id': datatype.number(1000),
  'name': lorem.sentence(),
  'posterImage': image.imageUrl(),
  'previewImage': image.imageUrl(),
  'backgroundImage': image.imageUrl(),
  'backgroundColor': '#AA0020',
  'videoLink': internet.url(),
  'previewVideoLink': image.imageUrl(),
  'description': lorem.sentences(),
  'rating': datatype.number(10),
  'scoresCount': datatype.number(100000),
  'director': `${name.findName()} ${name.lastName()}`,
  'starring': new Array(datatype.number(5)).fill('').map(() => `${name.firstName()} ${name.lastName()}`),
  'runTime': datatype.number(200),
  'genre': lorem.word(),
  'released': 2021,
  'isFavorite': datatype.boolean(),
});

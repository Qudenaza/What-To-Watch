export enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Movie = '/films',
  Player = '/player',
  NotFound = '/404',
  Review = '/review',
  Dev = '/dev'
}

export enum APIRoute {
  Movies = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Promo = '/promo',
  Favorite = '/favorite'
}

export const movieScreenTabs = ['Overview', 'Details', 'Reviews'];

export enum AuthorizationStatus {
  Unknown = 'UNKNOWN',
  NoAuth = 'NO_AUTH',
  Auth = 'AUTH',
}

export const FILTER_TYPE = {
  ALL: 'All genres',
  ADVENTURES: 'Adventure',
  COMEDIES: 'Comedy',
  CRIME: 'Crime',
  DOCUMENTARY: 'Documentary',
  DRAMAS: 'Drama',
  HORROR: 'Horror',
  KIDS: 'Kids & Family',
  ROMANCE: 'Romance',
  THRILLERS: 'Thriller',
  FANTASIES: 'Fantasy',
};

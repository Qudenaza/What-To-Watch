import { combineReducers } from 'redux';
import data from './data/data';
import user from './user-process/user-process';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: data,
  [NameSpace.User]: user,
});

export type RootState = ReturnType<typeof rootReducer>;

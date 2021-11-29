import { NameSpace } from '../root-reducer';
import { AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { AuthInfo } from '../../types/auth';

export const selectAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectAuthInfo = (state: State): AuthInfo => state[NameSpace.User].authInfo;

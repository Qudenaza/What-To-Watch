import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { AuthInfoFromServer } from '../../types/auth';
import { adaptServerAuthInfoToClient } from '../../services/adapter';
import { saveToken, dropToken } from '../../services/token';

type LoginParams = {
  email: string,
  password: string,
}

const checkAuthorizationStatus = createAsyncThunk(
  'user/checkAuthorizationStatus',
  async () => {
    const { data } = await api.get<AuthInfoFromServer>(APIRoute.Login);

    return data;
  },
);

const login = createAsyncThunk(
  'user/login',
  async (authorizationData: LoginParams) => {
    const { data } = await api.post(APIRoute.Login, authorizationData);

    saveToken(data.token);

    return data;
  },
);

const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await api.delete(APIRoute.Logout);

    dropToken();
  },
);

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  authInfo: {
    id: Infinity,
    name: '',
    email: '',
    token: '',
    avatarUrl: '',
  },
};

const userSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorizationStatus.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthorizationStatus.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = adaptServerAuthInfoToClient(action.payload);
      })
      .addCase(checkAuthorizationStatus.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = adaptServerAuthInfoToClient(action.payload);
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authInfo = initialState.authInfo;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authInfo = initialState.authInfo;
      });
  },
});

export { checkAuthorizationStatus, login, logout };
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authAPI from '../api/authAPI';
import userAPI from '../api/userAPI';

export const getUserDetail = createAsyncThunk(
  'userDetail/getUserDetail',
  async (currUser = undefined, thunkAPI) => {
    try {
      const axiosInstance = await authAPI.checkExpiredToken(
        thunkAPI.dispatch,
        thunkAPI.getState().auth.currUser
      );
      return await userAPI.getUserProfile(axiosInstance);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  'userDetail/updatePassword',
  async (passwordObj, thunkAPI) => {
    try {
      const axiosInstance = await authAPI.checkExpiredToken(
        thunkAPI.dispatch,
        thunkAPI.getState().auth.currUser
      );
      return await userAPI.updatePassword(axiosInstance, passwordObj);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    currUser: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currUser = action.payload;
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currUser = null;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetState } = userDetailSlice.actions;
export default userDetailSlice.reducer;

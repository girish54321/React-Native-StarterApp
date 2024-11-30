import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserList } from "../../models/responseType/UserListResponse";

export interface USER_LIST_STATE_TYPE {
  isLoading: boolean;
  error: string | null;
  users: UserList[];
}

const INITIAL_STATE: USER_LIST_STATE_TYPE = {
  isLoading: true,
  error: null,
  users: [],
};

export const userListSlice = createSlice({
  name: "userListSlice",
  initialState: INITIAL_STATE,
  reducers: {
    // Handle user data update
    setUserDataAction: (state, action: PayloadAction<UserList[]>) => {
      state.users = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    // Handle error update
    setUserErrorAction: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Handle loading state
    setUserLoadingAction: (state) => {
      state.isLoading = true;
      state.error = null;
    },
  },
});

export const {
  setUserDataAction,
  setUserErrorAction,
  setUserLoadingAction,
} = userListSlice.actions;

export default userListSlice.reducer;

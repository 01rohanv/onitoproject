import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  step: number;
  userData: { [key: string]: string }[];
  storeData: { [key: string]: string };
}

const initialState: UserState = {
  step: 1,
  userData: [],
  storeData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setUserData: (
      state,
      action: PayloadAction<{ [key: string]: string }[]>
    ) => {
      state.userData = action.payload;
    },
    setData: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.storeData = action.payload;
    },
  },
});

export const { setStep, setUserData, setData } = userSlice.actions;
export default userSlice.reducer;

export type RootState = ReturnType<typeof userSlice.reducer>;

import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: { publicKey: "", privateKey: "" },
  reducers: {
    walletSecret(state, action) {
      state.privateKey = action.payload.privateKey;
      state.publicKey = action.payload.publicKey;
    },
  },
});

export const { walletSecret } = walletSlice.actions;
export default walletSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pelanggan: [],
  pelangganById: [],
};

const pelangganSlice = createSlice({
  name: "pelanggan",
  initialState,
  reducers: {
    addAllPelanggan: (state, { payload }) => {
      state.pelanggan = payload;
    },
    addPelanggan: (state, { payload }) => {
      state.pelanggan.push(payload);
    },
    getPelangganById: (state, { payload }) => {
      state.pelangganById = state.pelanggan.find((pelanggan) => pelanggan.id_pelanggan === payload);
    },
  },
});

export const { addAllPelanggan, addPelanggan, getPelangganById } = pelangganSlice.actions;
export const getAllPelanggan = (state) => state.pelanggan.pelanggan;
export const getPelangganByIdSelector = (state) => state.pelanggan.pelangganById;
export default pelangganSlice.reducer;

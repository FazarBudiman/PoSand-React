import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  karyawan: [],
};

const karyawanSlice = createSlice({
  name: "karyawan",
  initialState,
  reducers: {
    addAllKaryawan: (state, { payload }) => {
      state.karyawan = payload;
    },

    addKaryawan: (state, { payload }) => {
      state.karyawan.push(payload);
    },

    deleteKaryawan: (state, { payload }) => {
      const deletedId = payload;
      state.karyawan = state.karyawan.filter((karyawan) => karyawan.id_karyawan !== deletedId);
    },
    updateKaryawan: (state, { payload }) => {
      state.karyawan = state.karyawan.filter((karyawan) => karyawan.id_karyawan !== payload.id_karyawan);
      state.karyawan.push(payload);
    },
  },
});

export const { addKaryawan, addAllKaryawan, deleteKaryawan, updateKaryawan } = karyawanSlice.actions;
export const getAllKaryawan = (state) => state.karyawan.karyawan;
export const getSearchQuery = (state) => state.karyawan.searchQuery;
export default karyawanSlice.reducer;

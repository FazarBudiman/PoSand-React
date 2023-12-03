import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  pesanan: [],
  pesananBelumSelesai: [],
  pesananDikerjakan: [],
  pesananSelesai: [],
  selectedPesanan: [],
};

const PesananSlice = createSlice({
  name: "pesanan",
  initialState,
  reducers: {
    addAllPesanan: (state, { payload }) => {
      state.pesanan = payload;

      state.pesananBelumSelesai = state.pesanan.filter((pesanan) => pesanan.pesanan_selesai === 0 && pesanan.sedang_dikerjakan === 0);
      state.pesananDikerjakan = state.pesanan.filter((pesanan) => pesanan.pesanan_selesai === 0 && pesanan.sedang_dikerjakan === 1);
      state.pesananSelesai = state.pesanan.filter((pesanan) => pesanan.pesanan_selesai === 1 && pesanan.sedang_dikerjakan === 1);
    },
    selectedPesanan: (state, { payload }) => {
      state.selectedPesanan = null;
      state.selectedPesanan = state.pesanan.filter((pesanan) => pesanan.id_pesanan === payload);
    },
  },
});

export const { addAllPesanan, selectedPesanan } = PesananSlice.actions;
export const getAllPesanan = (state) => state.pesanan.pesanan;
export const getPesananBelumSelesai = (state) => state.pesanan.pesananBelumSelesai;
export const getPesananDikerjakan = (state) => state.pesanan.pesananDikerjakan;
export const getPesananSelesai = (state) => state.pesanan.pesananSelesai;
export const getSelectedPesanan = (state) => state.pesanan.selectedPesanan;
export default PesananSlice.reducer;

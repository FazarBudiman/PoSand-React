import { configureStore } from "@reduxjs/toolkit";
import KaryawanSlice from "./slice/KaryawanSlice";
import PesananSlice from "./slice/PesananSlice";
import PelangganSlice from "./slice/PelangganSlice";

export const dataStore = configureStore({
  reducer: {
    karyawan: KaryawanSlice,
    pesanan: PesananSlice,
    pelanggan: PelangganSlice,
  },
});

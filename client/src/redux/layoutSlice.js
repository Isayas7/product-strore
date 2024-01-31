import { createSlice } from "@reduxjs/toolkit";
export const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isSidebarOpen: true,
    isDrawerHover: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setDrawerHover: (state) => {
      state.isDrawerHover = !state.isDrawerHover;
    },
  },
});
export const { toggleSidebar, setDrawerHover } = layoutSlice.actions;
export default layoutSlice.reducer;

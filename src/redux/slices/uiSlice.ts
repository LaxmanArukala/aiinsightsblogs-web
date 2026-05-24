import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  themeMode: 'light' | 'dark';
  snackbar: { open: boolean; message: string; severity: 'success' | 'error' | 'info' | 'warning' };
}

const initialState: UiState = {
  themeMode: 'light',
  snackbar: { open: false, message: '', severity: 'info' },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state) { state.themeMode = state.themeMode === 'light' ? 'dark' : 'light'; },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) { state.themeMode = action.payload; },
    showSnackbar(state, action: PayloadAction<{ message: string; severity?: UiState['snackbar']['severity'] }>) {
      state.snackbar = { open: true, message: action.payload.message, severity: action.payload.severity ?? 'info' };
    },
    hideSnackbar(state) { state.snackbar.open = false; },
  },
});

export const { toggleTheme, setTheme, showSnackbar, hideSnackbar } = uiSlice.actions;
export default uiSlice.reducer;

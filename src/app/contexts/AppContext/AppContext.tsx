import { createContext } from 'react';

export interface AppState {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

export const AppContext = createContext<AppState | undefined>(undefined);

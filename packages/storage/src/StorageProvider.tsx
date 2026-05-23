import { createContext, useContext, useRef, type ReactNode } from "react";

export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

interface StorageContextValue {
  adapter: StorageAdapter;
}

const noopAdapter: StorageAdapter = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const StorageContext = createContext<StorageContextValue>({
  adapter: noopAdapter,
});

export interface StorageProviderProps {
  adapter: StorageAdapter;
  children: ReactNode;
}

export function StorageProvider({ adapter, children }: StorageProviderProps) {
  const value = useRef({ adapter }).current;
  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}

export function useStorageAdapter(): StorageAdapter {
  return useContext(StorageContext).adapter;
}

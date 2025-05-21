"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import AppInitializer from "./AppInitializer";

interface Props {
  children: ReactNode;
}

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <AppInitializer>
        {children}
      </AppInitializer>
    </ReduxProvider>
  );
};

export default RootProvider;

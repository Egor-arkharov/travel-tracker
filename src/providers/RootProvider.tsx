"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import AuthProvider from "./AuthProvider";

interface Props {
  children: ReactNode;
}

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ReduxProvider>
  );
};

export default RootProvider;

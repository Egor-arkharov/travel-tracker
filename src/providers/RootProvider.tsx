"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import AppInitializer from "./AppInitializer";

const MotionConfig = dynamic(
  () => import("framer-motion").then((m) => m.MotionConfig),
  { ssr: false }
);

interface Props {
  children: ReactNode;
}

const MotionWrapper = ({ children }: Props) => {
  return (
    <MotionConfig transition={{ duration: 0.4, ease: "easeOut" }}>
      {children}
    </MotionConfig>
  );
};

const RootProvider = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <AppInitializer>
        <MotionWrapper>{children}</MotionWrapper>
      </AppInitializer>
    </ReduxProvider>
  );
};

export default RootProvider;

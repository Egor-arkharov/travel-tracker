"use client";

import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";
import AppInitializer from "./AppInitializer";
import { MotionConfig, useReducedMotion } from "framer-motion";

interface Props {
  children: ReactNode;
}

const MotionWrapper = ({ children }: Props) => {
  const reduce = useReducedMotion();

  return (
    <MotionConfig
      transition={{
        duration: reduce ? 0 : 0.4,
        ease: reduce ? "linear" : "easeOut",
      }}
      reducedMotion={reduce ? "user" : "never"}
    >
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

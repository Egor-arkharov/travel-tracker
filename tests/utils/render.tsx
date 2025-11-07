// tests/utils/render.tsx
import React, { PropsWithChildren } from "react";
import { render as rtlRender, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/slices/authSlice";
import formReducer from "@/store/slices/formSlice";
import tripsReducer from "@/store/slices/tripsSlice";
import type { RootState } from "@/store";

export function setupTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      auth: authReducer,
      form: formReducer,
      trips: tripsReducer,
    },
    preloadedState: preloadedState as RootState | undefined,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof setupTestStore>;
}

export function render(
  ui: React.ReactElement,
  { preloadedState, store = setupTestStore(preloadedState), ...options }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...options }) };
}

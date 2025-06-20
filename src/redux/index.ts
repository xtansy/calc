import { configureStore } from "@reduxjs/toolkit";
import ConstructorCalcSlice from "./ConstructorCalcSlice";

const store = configureStore({
    reducer: { ConstructorCalcSlice },
});

type RootState = ReturnType<typeof store.getState>;

export { store };
export type { RootState };

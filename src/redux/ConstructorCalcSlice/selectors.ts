import { RootState } from "../";

export const calcSelector = (state: RootState) => state.ConstructorCalcSlice.calculator;

export const constructorSelector = (state: RootState) => state.ConstructorCalcSlice.constructor;
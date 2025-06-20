import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ConstructorCalc = {
    constructor: [
        {
            type: "display",
            value: undefined,
        },
        {
            type: "signs",
            value: ["/", "x", "-", "+"],
        },
        {
            type: "numbers",
            value: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","],
        },

        {
            type: "equal",
            value: "=",
        },
    ],
    calculator: [],
};

const ConstructorCalcSlice = createSlice({
    name: "ConstructorCalcSlice",
    initialState,
    reducers: {
        addElementToCalc: (state, action: PayloadAction<ElementsUnion>) => {
            const calculator = state.calculator;
            const payload = action.payload;

            const isHave = calculator.findIndex(
                (item) => item.type === payload.type
            );

            if (isHave < 0) {
                if (payload.type === "display") {
                    calculator.unshift(action.payload);
                    return;
                }
                calculator.push(action.payload);
            }
        },
        deleteElementInCalc: (
            state,
            action: PayloadAction<ElementsUnion["type"]>
        ) => {
            const calculator = state.calculator;
            const payload = action.payload;
            state.calculator = calculator.filter(
                (item) => item.type !== payload
            );
        },

        swapElementInCalc: (
            state,
            action: PayloadAction<{
                one: ElementsUnion["type"];
                two: ElementsUnion["type"];
            }>
        ) => {
            const calculator = state.calculator;
            const payload = action.payload;

            const oneIndex = calculator.findIndex(
                (item) => item.type === payload.one
            );
            const twoIndex = calculator.findIndex(
                (item) => item.type === payload.two
            );

            if (oneIndex > -1 && twoIndex > -1) {
                const temp = calculator[oneIndex];
                calculator[oneIndex] = calculator[twoIndex];
                calculator[twoIndex] = temp;
            }
        },
    },
});

const { actions, reducer } = ConstructorCalcSlice;
export const { addElementToCalc, deleteElementInCalc, swapElementInCalc } =
    actions;
export default reducer;

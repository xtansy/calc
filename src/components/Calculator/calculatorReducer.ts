import { Store, ReducerAction, ACTION_TYPE } from "./calculatorTypes";

export const INITIAL_STORE: Store = {
  currentOperand: "0",
  operation: null,
  previousOperand: null,
  overwrite: false,
};

export const reducer = (state: Store, { payload, type }: ReducerAction) => {
  switch (type) {
    case ACTION_TYPE.ADD_DIGIT:
      if (payload === "," && state.currentOperand === "Невозможно")
        return state;
      if (payload === "0" && state.currentOperand === "0") return state;
      if (payload === "," && state.currentOperand?.includes(".")) return state;
      if (payload === "," && state.currentOperand === "0")
        return { ...state, currentOperand: "0." };

      if (state.overwrite && !state.operation) {
        if (payload === ",") {
          return {
            ...state,
            overwrite: false,
            currentOperand: "0.",
          };
        }
        return {
          ...state,
          overwrite: false,
          currentOperand: payload ?? "",
        };
      }
      if (
        state.operation &&
        state.currentOperand !== "Невозможно" &&
        state.currentOperand &&
        !state.previousOperand
      ) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: payload !== "," ? payload ?? "" : "0.",
        };
      }
      if (payload === ",") {
        return {
          ...state,
          currentOperand: `${
            state.currentOperand !== "0" &&
            state.currentOperand !== "Невозможно"
              ? state.currentOperand
              : ""
          }${"."}`,
        };
      }
      return {
        ...state,
        currentOperand: `${
          state.currentOperand !== "0" && state.currentOperand !== "Невозможно"
            ? state.currentOperand
            : ""
        }${payload}`,
      };
    case ACTION_TYPE.CHOOSE_OPERATION:
      if (state.currentOperand === "Невозможно") return state;
      if (state.previousOperand === null) {
        return {
          ...state,
          operation: payload ?? null,
        };
      }

      // eslint-disable-next-line no-case-declarations
      const value = evaluate(state);

      return {
        ...state,
        previousOperand: null,
        currentOperand: value,
        operation: value !== "Невозможно" ? payload ?? "" : null,
      };
    case ACTION_TYPE.EVALUATE:
      if (!state.currentOperand || !state.previousOperand || !state.operation)
        return state;
      return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: null,
        operation: null,
        overwrite: true,
      };
    default:
      return state;
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }: Store) => {
  if (!previousOperand || !currentOperand) return "";
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";

  let result;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      if (current === 0) return "Невозможно";
      result = prev / current;
      break;
  }

  return String(result);
};

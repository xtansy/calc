export interface Store {
  currentOperand: string | null;
  operation: string | null;
  previousOperand: string | null;
  overwrite: boolean;
}

export enum ACTION_TYPE {
  ADD_DIGIT,
  CHOOSE_OPERATION,
  EVALUATE,
}

export type ReducerAction = {
  type: ACTION_TYPE;
  payload?: string;
};

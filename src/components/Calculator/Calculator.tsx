import { useReducer } from "react";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction } from "react";

import { Switcher } from "../../ui";
import { Elementor } from "../../common";
import { calcSelector } from "../../redux/ConstructorCalcSlice/selectors";

import { reducer, INITIAL_STORE } from "./calculatorReducer";
import { ACTION_TYPE } from "./calculatorTypes";

interface CalculatorProps {
  isConstructor: boolean;
  setIsConstructor: Dispatch<SetStateAction<boolean>>;
}

export const Calculator: React.FC<CalculatorProps> = ({
  isConstructor,
  setIsConstructor,
}) => {
  const [store, dispatch] = useReducer(reducer, INITIAL_STORE);

  const calc = useSelector(calcSelector);

  const onClickEqual = () => dispatch({ type: ACTION_TYPE.EVALUATE });
  const onClickDigit = (payload: string) =>
    dispatch({ type: ACTION_TYPE.ADD_DIGIT, payload });
  const onClickSign = (payload: string) =>
    dispatch({ type: ACTION_TYPE.CHOOSE_OPERATION, payload });

  return (
    <div className="calculator calculator_runtime">
      <Switcher
        setIsConstructor={setIsConstructor}
        isConstructor={isConstructor}
      />
      {calc.map((item, i) => (
        <Elementor
          key={i}
          onClickEqual={onClickEqual}
          onClickSign={onClickSign}
          onClickDigit={onClickDigit}
          currentOperand={store.currentOperand}
          element={item}
        />
      ))}
    </div>
  );
};

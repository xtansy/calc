import { Square, Wrapper } from "../../ui";

interface CalcProps extends React.ComponentPropsWithRef<"div"> {
    element: DisplayElement | SignElement | NumberElement | EqualElement;
    onClickSign?: (sign: string) => void;
    onClickDigit?: (number: string) => void;
    onClickEqual?: () => void;
    currentOperand?: string | null;
}

export const Elementor: React.FC<CalcProps> = ({
    currentOperand = "0",
    element,
    onClickEqual,
    onClickSign,
    onClickDigit,
    ...props
}) => {
    // const behindPointStr = displayValue.split(".")[1];

    // const value =
    //     behindPointStr && behindPointStr.length > 1
    //         ? (+displayValue).toFixed(1)
    //         : displayValue;

    switch (element.type) {
        case "display":
            return (
                <Wrapper {...props}>
                    <input
                        className="input"
                        type="text"
                        value={currentOperand ?? ""}
                        readOnly
                    />
                </Wrapper>
            );
        case "signs":
            return (
                <Wrapper {...props}>
                    {element.value.map((sign, i) => {
                        return (
                            <Square
                                onClick={
                                    onClickSign && (() => onClickSign(sign))
                                }
                                key={i}
                                size="small"
                                value={sign}
                            />
                        );
                    })}
                </Wrapper>
            );
        case "numbers":
            return (
                <Wrapper {...props}>
                    {element.value.map((number, i) => {
                        const size = number === "0" ? "large" : "medium";
                        return (
                            <Square
                                onClick={
                                    onClickDigit && (() => onClickDigit(number))
                                }
                                key={i}
                                value={number}
                                size={size}
                            />
                        );
                    })}
                </Wrapper>
            );
        case "equal":
            return (
                <Wrapper onClick={onClickEqual && onClickEqual} {...props}>
                    <Square value={element.value} size="max" color="blue" />
                </Wrapper>
            );
    }
};

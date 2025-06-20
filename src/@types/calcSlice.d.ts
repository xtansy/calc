interface CalcElement<T, E = void> {
    type: T
    value: E;
}

type DisplayElement = CalcElement<"display">;
type SignElement = CalcElement<"signs", string[]>;
type NumberElement = CalcElement<"numbers", string[]>;
type EqualElement = CalcElement<"equal", "=">;

type Elements = Array<DisplayElement | SignElement | NumberElement | EqualElement>;

type ElementsUnion = DisplayElement | SignElement | NumberElement | EqualElement;

interface ConstructorCalc {
    constructor: Elements;
    calculator: Elements;
}
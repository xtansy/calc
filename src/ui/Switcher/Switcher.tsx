import "./Switcher.scss";

import { Dispatch, SetStateAction } from "react";

import { Eye, Selector } from "../SVG";

interface SwitcherProps {
    isConstructor: boolean;
    setIsConstructor: Dispatch<SetStateAction<boolean>>;
}

export const Switcher: React.FC<SwitcherProps> = ({
    isConstructor,
    setIsConstructor,
}) => {
    const onClickRunTime = () => {
        setIsConstructor(false);
    };
    const onClickConstructor = () => {
        setIsConstructor(true);
    };

    const constructorClazz = isConstructor ? "switcher__field_active" : "";
    const runtimeClazz = !isConstructor ? "switcher__field_active" : "";

    return (
        <div className="switcher">
            <div
                onClick={onClickRunTime}
                className={`switcher__field ${runtimeClazz}`}
            >
                <Eye />
                <p>Runtime</p>
            </div>
            <div
                onClick={onClickConstructor}
                className={`switcher__field ${constructorClazz}`}
            >
                <Selector />
                <p>Constructor</p>
            </div>
        </div>
    );
};

import React, { Dispatch, SetStateAction } from "react";
import { Drop } from "../../common/Drop/Drop";
import { Canvas, Switcher } from "../../ui";
import { DragCalculator } from "./DragCalculator/DragCalculator";

interface ConstructorProps {
    isConstructor: boolean;
    setIsConstructor: Dispatch<SetStateAction<boolean>>;
}

export const Constructor: React.FC<ConstructorProps> = ({
    isConstructor,
    setIsConstructor,
}) => {
    return (
        <>
            <DragCalculator />
            <div className="calculator">
                <Switcher
                    setIsConstructor={setIsConstructor}
                    isConstructor={isConstructor}
                />
                <Drop>
                    <Canvas className="calculator__canvas" />
                </Drop>
            </div>
        </>
    );
};

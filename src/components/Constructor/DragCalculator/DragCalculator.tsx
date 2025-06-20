import { useSelector } from "react-redux";

import { constructorSelector } from "../../../redux/ConstructorCalcSlice/selectors";
import { Elementor, Drag } from "../../../common";

export const DragCalculator = () => {
    const constructor = useSelector(constructorSelector);

    return (
        <div className="constructor">
            {constructor.map((item, i) => {
                return (
                    <Drag dragType="constr" key={i} item={item}>
                        <Elementor element={item} />
                    </Drag>
                );
            })}
        </div>
    );
};

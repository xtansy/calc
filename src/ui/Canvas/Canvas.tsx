import "./Canvas.scss";

import { useSelector, useDispatch } from "react-redux";

import { Picture } from "../SVG";
import { calcSelector } from "../../redux/ConstructorCalcSlice/selectors";
import { Elementor, Drag } from "../../common";
import { deleteElementInCalc } from "../../redux/ConstructorCalcSlice";

type CanvasProps = React.ComponentPropsWithRef<"div">;

export const Canvas: React.FC<CanvasProps> = (props) => {
    const dispatch = useDispatch();

    const calc = useSelector(calcSelector);

    const clazz = `canvas ${props.className}`;

    const onDoubleClickElement = (type: ElementsUnion["type"]) => {
        dispatch(deleteElementInCalc(type));
    };

    if (calc.length) {
        return (
            <div className="calc">
                {calc.map((item, i) => {
                    return (
                        <Drag
                            dragType="calc"
                            item={item}
                            key={i}
                            onDoubleClick={() =>
                                onDoubleClickElement(item.type)
                            }
                        >
                            <Elementor element={item} />
                        </Drag>
                    );
                })}
            </div>
        );
    }

    return (
        <div className={clazz}>
            <div className="canvas__content">
                <Picture />
                <h2 className="canvas__content-title">Перетащите сюда</h2>
                <p className="canvas__content-subtitle">любой элемент</p>
                <p className="canvas__content-subtitle">из левой панели</p>
            </div>
        </div>
    );
};

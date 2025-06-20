import { useState, DragEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { calcSelector } from "../../redux/ConstructorCalcSlice/selectors";
import { swapElementInCalc } from "../../redux/ConstructorCalcSlice";

interface DragProps extends React.ComponentPropsWithRef<"div"> {
    children: React.ReactNode;
    item: DisplayElement | SignElement | NumberElement | EqualElement;
    dragType: "calc" | "constr";
}

export const Drag: React.FC<DragProps> = ({
    children,
    item,
    dragType,
    ...props
}) => {
    const calc = useSelector(calcSelector);
    const dispatch = useDispatch();

    const isHave = calc.findIndex((element) => element.type === item.type) > -1;
    const isConstr = dragType === "constr";

    const isBlock = isConstr && isHave;
    const isDisplayBlock = item.type === "display" && !isConstr;

    const [isDragging, setIsDragging] = useState<boolean>(false);

    const onDragStart = (
        e: DragEvent<HTMLDivElement>,
        item: DragProps["item"]
    ) => {
        setIsDragging(true);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("element", JSON.stringify(item));
        e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
    };

    const onDragEnd = () => {
        setIsDragging(false);
    };

    const onDrop = (e: DragEvent<HTMLDivElement>, item: DragProps["item"]) => {
        const data = e.dataTransfer.getData("element");
        const element: DragProps["item"] = JSON.parse(data);

        if (element.type !== "display" && item.type !== "display") {
            dispatch(
                swapElementInCalc({
                    one: item.type,
                    two: element.type,
                })
            );
        }
    };

    return (
        <div
            {...props}
            draggable={!isBlock && !isDisplayBlock}
            onDragStart={(e) => onDragStart(e, item)}
            onDragEnd={onDragEnd}
            onDrop={(e) => onDrop(e, item)}
            style={{
                opacity: isBlock || isDragging ? 0.5 : 1,
                cursor: isBlock || isDragging ? "no-drop" : "move",
            }}
        >
            {children}
        </div>
    );
};

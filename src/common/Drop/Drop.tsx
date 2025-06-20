import "./Drop.scss";

import { useDispatch } from "react-redux";
import { useRef } from "react";

import { addElementToCalc } from "../../redux/ConstructorCalcSlice";

interface DropProps {
    children: React.ReactNode;
}

export const Drop: React.FC<DropProps> = ({ children }) => {
    const dispatch = useDispatch();
    const dropRef = useRef<HTMLDivElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        dropRef.current?.classList.remove("drop_active");

        // const target = event.target as HTMLDivElement;
        const data = event.dataTransfer.getData("element");
        const element = JSON.parse(data);

        dispatch(addElementToCalc(element));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";

        dropRef.current?.classList.add("drop_active");

        // const target = event.target as HTMLDivElement;
    };
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        // const target = event.target as HTMLDivElement;
    };
    return (
        <div
            className="drop"
            ref={dropRef}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {children}
        </div>
    );
};

import "./Square.scss";

interface SquareProps extends React.ComponentPropsWithRef<"div"> {
    value: string;
    size?: "small" | "medium" | "large" | "max";
    color?: "white" | "blue";
}

export const Square: React.FC<SquareProps> = ({
    value,
    size = "medium",
    color = "white",
    ...props
}) => {
    return (
        <div {...props} className={`square square_${size} square_${color}`}>
            <p>{value}</p>
        </div>
    );
};

import "./Wrapper.scss";

interface WrapperProps extends React.ComponentPropsWithRef<"div"> {
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, ...props }) => {
    return (
        <div {...props} className="wrapper">
            {children}
        </div>
    );
};

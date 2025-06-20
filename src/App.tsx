import "./App.scss";

import { useState } from "react";

import { Calculator, Constructor } from "./components";

function App() {
    const [isConstructor, setIsConstructor] = useState<boolean>(true);

    return (
        <div className="app">
            {isConstructor ? (
                <Constructor
                    isConstructor={isConstructor}
                    setIsConstructor={setIsConstructor}
                />
            ) : (
                <Calculator
                    isConstructor={isConstructor}
                    setIsConstructor={setIsConstructor}
                />
            )}
        </div>
    );
}

export default App;

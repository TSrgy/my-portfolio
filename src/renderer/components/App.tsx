import * as React from "react";

import { useEffect, useState } from "react";

import { Header } from "./Header";

const App: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);

    return (
        <div>
            <Header />
        </div>
    );
};

export default App;

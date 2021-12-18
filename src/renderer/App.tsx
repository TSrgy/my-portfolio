import * as React from "react";

import { useEffect, useState } from "react";

const App: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count + 1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount]);

    return (
        <div>
            <p>Hello world</p>
        </div>
    );
};

export default App;

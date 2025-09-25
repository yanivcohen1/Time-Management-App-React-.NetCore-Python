import React from "react";
import { useLocation } from "react-router-dom";

const MyComponent: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id"); // string | null
    const name = queryParams.get("name");

    return (
        <>
            <div className="p-4 text-center">
                <h1>Contact</h1>
                <h3 className="text-xl font-bold">Query: ID={id} name={name}</h3>
            </div>
            
        </>
    );
};

export default MyComponent;

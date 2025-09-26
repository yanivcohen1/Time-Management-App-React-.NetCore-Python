import React from "react";
import { useLocation, useParams } from "react-router-dom";

const MyComponent: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const aboutId = useParams<{ id: string }>();
    const id = queryParams.get("id"); // string | null
    const name = queryParams.get("name");

    return (
        <>
            <div className="p-4 text-center">
                <h1>Contact</h1><br/>
                <h3 className="text-xl font-bold">Query: ID={id} name={name}</h3><br/>
                <h3 className="text-xl font-bold">Param: ID={aboutId.id}</h3>
            </div>
            
        </>
    );
};

export default MyComponent;

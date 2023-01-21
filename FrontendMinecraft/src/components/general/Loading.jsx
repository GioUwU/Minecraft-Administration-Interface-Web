import React from "react";

//un loading component animado con tailwind

const Loading = () => {
    return (
        <div className="items-center h-screen pt-4 lg:pt-40 px-4 lg:px-10 text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-100">
        </div>
        
        </div>
    );
    }

export default Loading;
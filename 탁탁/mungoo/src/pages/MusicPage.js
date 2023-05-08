import React from "react";
import D3 from "./D3";

function MusicPage(){
    const handleButtonClick = () => {
        window.open('/d3.html', '_blank', 'width=800,height=600');
    }

    return (
        <button onClick={handleButtonClick}>Open HTML File</button>
    );
}
export default MusicPage;
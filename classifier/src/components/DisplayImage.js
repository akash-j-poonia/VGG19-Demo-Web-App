import React from "react";

function DisplayImage(props){
    return(
        <div>
            <div className="ImageContainer">
                <img className="image" src={props.path} alt=""></img>
            </div>
        </div>
    )
}
export default DisplayImage;
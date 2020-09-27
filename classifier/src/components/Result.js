import React from "react";

function Result(props){
    var result="Hmm.. That looks like a "+props.name;
    if(props.name==='-1')
        result="Sorry Something went Wrong!! Please try again later!";
    else if(props.name.substr(0,10)==="Processing")
        result="Processing....";
    console.log(props.name.substr(0,10));
    return(
        <div className="result">
            {result}
        </div>

    )
}
export default Result;
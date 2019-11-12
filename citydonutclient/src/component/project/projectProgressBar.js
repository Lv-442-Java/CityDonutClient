import React from "react";

export class ProjectProgressBar extends React.Component {

    render(){
        return(
            <div className="row-full" style={{background: "#f0f0f0", width:"100%", height: "80px"}}>
                <button type="button" className="btn btn-primary">Donate</button>
            </div>
        )
    }
}
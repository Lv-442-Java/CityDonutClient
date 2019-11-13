import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Card from "react-bootstrap/Card";

class ProgressBar extends React.Component {

    render() {
        return (
            <div className="progress" style={{height: "25px"}}>
                <OverlayTrigger overlay={<Tooltip>{this.props.doneTip}</Tooltip>}>
                    <div className="progress-bar bg-success" role="progressbar"
                         style={{width: `${this.props.donePercent}%`}}
                         aria-valuenow={this.props.donePercent}
                         aria-valuemin="0" aria-valuemax="100">{this.props.doneLabel}
                    </div>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>{this.props.undoneTip}</Tooltip>}>
                    <div className="progress-bar bg-secondary" role="progressbar"
                         style={{width: `${100 - this.props.donePercent}%`}}
                         aria-valuenow={100 - this.props.donePercent}
                         aria-valuemin="0"
                         aria-valuemax="100">{this.props.undoneLabel}
                    </div>
                </OverlayTrigger>
            </div>
        )
    }
}

export default ProgressBar;

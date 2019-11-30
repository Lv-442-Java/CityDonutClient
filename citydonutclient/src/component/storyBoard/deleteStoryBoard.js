import React from 'react';
import {Button} from "react-bootstrap";

export class DeleteStoryBoard extends React.Component {
    render() {
        return (
            <div>
                <Button variant="secondary" style={{'font-size':'10px'}}>видалити</Button>
            </div>
        );
    }
}

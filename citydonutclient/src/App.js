import React from 'react';
import {Head} from "./component/head/head";
import {Routers} from "./routers";
class App extends React.Component {

    render() {
        return (
            <div>
                <Routers />
            </div>
        )
    }
}

export default App;

import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Login} from "./component/login/login";
import {Base} from "./component/base/base";
import {Head} from "./component/head/head";

export class Routers extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Head/>
                <Switch>
                    <Route exact path ='/' component={Base} />
                    <Route path ='/login'>
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        )
    }
}

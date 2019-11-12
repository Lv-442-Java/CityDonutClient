import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Login} from "./component/login/login";
import {Base} from "./component/base/base";
import {Head} from "./component/head/head";
import {CreateProject} from "./component/project/CreateProject";
import {Projects} from "./component/project/projects";
import {ChangePassword} from "./component/user/change_password";

export class Routers extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Head/>
                <Switch>
                    <Route exact path ='/' component={Base} />
                    <Route path ='/login' component={Login} />
                    <Route path ='/project/create' component={CreateProject} />
                    <Route path='/projects' component={Projects} />
                    <Route path='/user/change_password' component={ChangePassword} />
                </Switch>
            </BrowserRouter>
        )
    }
}

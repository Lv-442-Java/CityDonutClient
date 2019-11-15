import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Login} from "./component/login/login";
import {Base} from "./component/base/base";
import {Head} from "./component/head/head";
import {CreateProject} from "./component/project/createNewProject/CreateProject";
import {Projects} from "./component/project/projects";
import Registration from "./component/auth/registration";
import UpdateProject from "./component/project/updateAxistProject/UpdateProject";

export class Routers extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Head/>
                <Switch>
                    <Route exact path ='/' component={Base} />
                    <Route path ='/login' component={Login} />
                    <Route path ='/project/create' component={CreateProject} />
                    <Route path ='/project/update' component={UpdateProject} />
                    <Route path='/registration' component={Registration} />
                    <Route exact path='/projects' component={Projects} />
                </Switch>
            </BrowserRouter>
        )
    }
}

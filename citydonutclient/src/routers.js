import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Login} from "./component/login/login";
import {Base} from "./component/base/base";
import {Head} from "./component/head/head";
import {CreateProject} from "./component/project/CreateProject";
import {PhotoSlider} from "./component/project/photoSlider";
import {Projects} from "./component/project/projects";
import {Project} from "./component/project/project";

export class Routers extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Head/>
                <Switch>
                    <Route exact path ='/' component={Base} />
                    <Route path ='/login' component={Login} />
                    <Route path ='/project/create' component={CreateProject} />

                    <Route path ='/project/:id' render={(props) => <Project{...props} id = {this.props.id}/>}/>
                    <Route exact path='/projects' component={Projects} />

                </Switch>
            </BrowserRouter>
        )
    }
}

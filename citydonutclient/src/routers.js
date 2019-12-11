import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Login from './component/login/login';
import { Base } from './component/base/base';
import { Head } from './component/head/head';
import { CreateProject } from './component/project/createNewProject/CreateProject';
import { Projects } from './component/project/projects';
import { Project } from './component/project/project';
import { Registration } from './component/auth/registration';
import { ActivationUser } from './component/auth/activationUser';
import { UserEdit } from './component/user/user_edit';
import DonatedProjects from './component/project/donatedProjects';
import { UpdateProjectPage } from './component/project/updateProject/UpdateProjectPage';
import { MyProjects } from './component/user/myProjects';
import FAQ from './component/base/FAQ';
import {FreeProjectsList} from "./component/project/FreeProjectsList";

export class Routers extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Head />
                <Switch>
                    <Route exact path="/projects/free" component={FreeProjectsList} />
                    <Route exact path="/" component={Base} />
                    <Route path="/login" component={Login} />
                    <Route path="/project/create" component={CreateProject} />
                    <Route path="/project/update/:projectId" component={UpdateProjectPage} />
                    <Route path="/registration" component={Registration} />
                    <Route exact path="/projects" component={Projects} />
                    <Route path="/projects/:id" render={props => <Project {...props} id={this.props.id} />} />
                    <Route path="/activationUser/:activationCode" component={ActivationUser} />
                    <Route path="/donates/projects" component={DonatedProjects} />
                    <Route path="/user" component={UserEdit} />
                    <Route path="/userprojects" component={MyProjects} />
                    <Route path="/faq" component={FAQ} />
                </Switch>
            </BrowserRouter>
        );
    }
}

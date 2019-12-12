import React from 'react';
import UpdateProject from '../updateAxistProject/UpdateProject';
import { Chat } from '../../chat/chat';

export class UpdateProjectPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            projectId: parseInt(props.match.params.projectId, 10),
        };
    }

    render() {
        return (
            <div style={{
                verticalAlign: 'top',
                height: 'calc(100% - 56px)',
            }}
            >
                <div style={{
                    verticalAlign: 'top',
                    width: '50%',
                    height: '100%',
                    display: 'inline-block',
                    margin: '0 auto',
                    marginTop: '-25px',
                }}
                >
                    <UpdateProject  projectId={this.state.projectId}/>
                </div>
                <div style={{
                    verticalAlign: 'top',
                    width: '50%',
                    height: '100%',
                    display: 'inline-block',
                    margin: '0 auto',
                }}
                >
                    <Chat projectId={this.state.projectId} />
                </div>
            </div>
        );
    }
}

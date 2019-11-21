import React from "react";
import './sendmessage.css'
import 'bootstrap/dist/css/bootstrap.css';


export class SendMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value : '',
            mode: 'create',
        };
    }

    setModeToEdit = (messageObject) => {
        this.setState({mode: 'edit', value: messageObject.text, editId: messageObject.id})
    };

    setModeToCreate = () => {
        this.setState({mode: 'create', value: ''});
    };

    handleChange = (event) => {
        this.setState({value : event.target.value});
    };

    handleSubmitCreate = (event) => {
        event.preventDefault();
        let textMessage = event.target.elements.textArea.value;
        this.props.onMessageSend(textMessage);
        this.setState({value: ''})
    };

    handleSubmitEdit = (event) => {
        event.preventDefault();
        let textMessage = event.target.elements.textArea.value;
        this.props.onMessageEdit(textMessage, this.state.editId);
        this.setModeToCreate();
    };

    render() {
        if (this.state.mode === 'create') {
            return (
                <form onSubmit={this.handleSubmitCreate} className="chat-interface-container">
                    <table className="chat-interface-table">
                        <tr>
                            <td>
                                <textarea
                                name="textArea"
                                onChange={this.handleChange}
                                value={this.state.value}
                                id="messageTextArea"
                                cols="30"
                                rows="3"
                                placeholder="Type something..."/></td>
                            <td className="chat-interface-button-td">
                                <button id="messageSendButton" className="btn btn-dark">Send</button>
                            </td>
                        </tr>
                    </table>
                </form>
            );
        }
        else {
            return (
                <form onSubmit={this.handleSubmitEdit} className="chat-interface-container">
                    <table className="chat-interface-table">
                        <tbody>
                            <tr>
                                <td>
                                    <textarea
                                        name="textArea"
                                        onChange={this.handleChange}
                                        value={this.state.value}
                                        id="messageTextArea"
                                        cols="30"
                                        rows="3"
                                        placeholder="Type something..."/></td>
                                <td className="chat-interface-button-td">
                                    <button id="messageEditButton" className="btn btn-dark">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            );
        }
    }
}
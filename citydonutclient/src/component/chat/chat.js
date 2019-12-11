import React from 'react';
import './chat.css';
import axios from '../../utils/services';
import { Message } from './elements/message/message';
import { SendMessage } from './elements/sendmessage/sendmessage';
import { Subscribe } from './elements/subscribe/subscribe';


export class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.emailNotifyEnabled = true;
        this.port = 8091;
        this.users = {};
        this.updates = [];
        this.userAmount = 0;
        this.changeTime = 10 * 60 * 1000;
        this.messagesUpdateTime = 30 * 1000;
        this.sendMessageRef = React.createRef();
        this.needScroll = true;

        this.state = {
            // projectId: 8,
            projectId: this.props.projectId,
            messages: [],
        };
    }

    getMessagesFromApi() {
        const url = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment`;
        return axios.get(url, { withCredentials: true })
            .then((response => response.data));
    }

    initAssignedUsers = () => {
        const url = `http://localhost:${this.port}/api/v1/user/${this.state.projectId}/roles`;
        return axios.get(url, { withCredentials: true }).then((response) => {
            this.userAmount = response.data.length;
            response.data.forEach(userData => (this.users[userData.id] = userData));
        });
    };

    initMessages = () => this.getMessagesFromApi().then((data) => {
        this.composeMessages(data).then((messages) => {
            this.setState({
                messages,
            });
        });
    }).then(() => {
        if (this.emailNotifyEnabled === true) {
            const patchUrl = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment/denotify`;
            axios.patch(patchUrl, {}, { withCredentials: true });
        }
    });

    composeMessages = (messages) => {
        const messagesPromises = [];
        messages.forEach((message, i) => {
            messagesPromises[i] = this.composeMessage(message);
        });

        return axios.all(messagesPromises).then(axios.spread((...args) => args.map(response => response)));
    };

    composeMessage = (message) => {
        const messageDateBefore = new Date(Date.parse(message.date));
        const messageDateAfter = `${[
            messageDateBefore.getDate(),
            (messageDateBefore.getMonth() + 1),
            messageDateBefore.getFullYear()].join('.')} ${
            [messageDateBefore.getHours(),
                messageDateBefore.getMinutes()].join(':')}`;

        return this.getUserData(message.userId).then(user => ({
            id: message.id,
            fromCurrent: this.state.userId === message.userId,
            userId: message.userId,
            name: `${user.firstName} ${user.lastName}<${user.role}>`,
            text: message.description,
            date: messageDateAfter,
            dateObject: messageDateBefore,
            fromUser: user.role === 'user',
        }));
    };

    async getUserData(userId) {
        if (this.users[userId] === undefined) {
            console.log('no');
            const url = `http://localhost:${this.port}/api/v1/user/${userId}/role`;
            const response = await axios.get(url, { withCredentials: true });
            this.users[userId] = response.data;
            return response.data;
        }

        return this.users[userId];
    }

    sendReadMessagesRequest = async () => {
        const putUrl = `http://localhost:${this.port}/api/v1/chatupdated/${this.state.projectId}`;
        return axios.put(putUrl, {}, { withCredentials: true });
    };

    getChatUpdateData = async () => {
        const getUrl = `http://localhost:${this.port}/api/v1/chatupdated/${this.state.projectId}`;
        return axios.get(getUrl, { withCredentials: true }).then((response) => { this.updates = response.data; });
    };

    updateMessagesFunc = () => {
        console.log('update');
        this.initAssignedUsers().then(() => {
            this.needScroll = false;
            this.getChatUpdateData().then(() => {
                this.initMessages().then(this.sendReadMessagesRequest);
            });
            this.messagesUpdateTimeout = setTimeout(this.updateMessagesFunc, this.messagesUpdateTime);
        });
    };

    getCurrentUser = async () => axios.get('http://localhost:8091/api/v1/user', { withCredentials: true }).then((response) => {
        console.log(response.data.id);
        this.setState({
            userId: response.data.id,
            userFirstName: response.data.firstName,
            userLastName: response.data.lastName,
        });
    });

    componentDidMount() {
        this.initAssignedUsers().then(() => {
            this.getCurrentUser().then(() => {
                this.getChatUpdateData().then(() => {
                    this.initMessages().then(() => {
                        this.sendReadMessagesRequest();
                        this.messagesUpdateTimeout = setTimeout(this.updateMessagesFunc, this.messagesUpdateTime);
                    });
                });
            });
        });

        const messagesList = document.getElementById('messagesList');
        messagesList.scrollTop = messagesList.scrollHeight;
    }

    componentDidUpdate() {
        if (this.needScroll === true) {
            const messagesList = document.getElementById('messagesList');
            messagesList.scrollTop = messagesList.scrollHeight;
        }
        this.needScroll = true;
    }

    componentWillUnmount() {
        clearTimeout(this.messagesUpdateTimeout);
    }

    handleMessageEdit = (textMessage, messageId) => {
        const editUrl = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment/${messageId}`;
        const editData = {
            description: textMessage,
        };
        axios.put(editUrl, editData, { withCredentials: true }).then(() => {
            let messageIndex = 0;
            for (let i = 0; i < this.state.messages.length; i++) {
                if (this.state.messages[i].id === messageId) {
                    messageIndex = i;
                    break;
                }
            }
            this.setState(state => ({
                messages: [
                    ...state.messages.slice(0, messageIndex),
                    {
                        ...state.messages[messageIndex],
                        text: textMessage,
                    },
                    ...state.messages.slice(messageIndex + 1),
                ],
            }));
        });
    };

    handleMessageSend = (textMessage) => {
        if (textMessage == null || textMessage === '') return;

        this.needScroll = true;

        const newMessage = {
            text: textMessage,
            userId: this.state.userId,
            fromUser: (this.users[this.state.userId].role === 'user'),
            name: `${this.state.userFirstName} ${this.state.userLastName}<${this.users[this.state.userId].role}>`,
            date: 'loading',
            sent: false,
        };

        this.newMessageRef = React.createRef();

        console.log('first after send');
        this.setState(state => ({ messages: [...state.messages, newMessage] }));

        const newCommentUrl = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment`;
        const newCommentData = {
            description: textMessage,
            userId: this.state.userId,
            projectId: this.state.projectId,
        };
        setTimeout(() => {
            axios.post(newCommentUrl, newCommentData, { withCredentials: true }).then((respone) => {
                const messageDateBefore = new Date(Date.parse(respone.data.date));
                const messageDateAfter = `${[
                    messageDateBefore.getDate(),
                    (messageDateBefore.getMonth() + 1),
                    messageDateBefore.getFullYear()].join('.')} ${
                    [messageDateBefore.getHours(),
                        messageDateBefore.getMinutes()].join(':')}`;
                // this.needScroll = true;
                this.newMessageRef.current.onMessageSent(respone.data, newMessage, messageDateAfter, messageDateBefore);
                this.newMessageRef = undefined;
                console.log(this.state);
                return respone.data;
            }, () => { this.initMessages(); }).then(
                (comment) => {
                    if (this.emailNotifyEnabled === true) {
                        const pathUrl = `http://localhost:${this.port}/api/v1/project/${
                            this.state.projectId
                        }/comment/${
                            comment.id
                        }/notify`;
                        console.log(pathUrl);
                        axios.patch(pathUrl, {}, { withCredentials: true });
                    }
                },
            );
        }, 1);
    };

    handleMessageContextMenuAction = (event, data) => {
        console.log(data);

        if (data.action === 'delete') this.handleMessageContextDelete(event, data);
        else if (data.action === 'edit') this.handleMessageContextEdit(event, data);
    };

    handleMessageContextEdit = (event, data) => {
        this.sendMessageRef.current.setModeToEdit(data.messageObject);
    };

    handleMessageContextDelete = (event, data) => {
        console.log(data);
        const deleteUrl = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment/${data.id}`;
        axios.delete(deleteUrl, { withCredentials: true }).then(() => {
            this.setState(state => ({ messages: state.messages.filter(elem => (elem.id !== data.id)) }));
        });
    };

    render() {
        let key = 0;
        return (
            <div className="chat-container">
                <div className="chat-header">
                    <div className="chat-header-description">
                        <div>
                            <div className="chat-header-description-name">Chat name</div>
                            <div className="chat-header-description-amount">
                                {this.userAmount}
                                {' '}
members
                            </div>
                        </div>
                        <div className="chat-header-description-subscribe">
                            <Subscribe port={this.port} project={this.state.projectId} />
                        </div>
                    </div>
                </div>
                <ul id="messagesList" style={{ height: (document.documentElement.clientHeight - 60 - 100 - 56) }} className="chat-messages">
                    {
                        this.state.messages.map(
                            (message) => {
                                let isAllowedChange = (new Date() - message.dateObject) < this.changeTime;
                                isAllowedChange = isAllowedChange && message.fromCurrent;
                                const messageComponent = (
                                    <Message
                                        ref={message.id === undefined ? this.newMessageRef : null}
                                        key={key}
                                        messageItem={message}
                                        changeAllowed={isAllowedChange}
                                        userNames={this.users}
                                        updates={this.updates}
                                        changeTime={this.changeTime}
                                        contextMenuActionHandler={this.handleMessageContextMenuAction}
                                    />
                                );
                                key = message.id;
                                return messageComponent;
                            },
                        )
                    }
                </ul>
                <div className="chat-interface">
                    <SendMessage
                        ref={this.sendMessageRef}
                        onMessageEdit={this.handleMessageEdit}
                        onMessageSend={this.handleMessageSend}
                    />
                </div>
            </div>
        );
    }
}

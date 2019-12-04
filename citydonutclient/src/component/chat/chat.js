import React from 'react';
import './chat.css';
import axios from 'axios';
import { Message } from './elements/message/message';
import { SendMessage } from './elements/sendmessage/sendmessage';
import {Subscribe} from "./elements/subscribe/subscribe";


export class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.emailNotifyEnabled = false;
        this.port = 8091;
        this.users = {};
        this.userAmount = 0;
        this.changeTime = 10 * 60 * 1000;
        this.messagesUpdateTime = 30 * 1000;
        this.sendMessageRef = React.createRef();
        this.needScroll = true;

        this.state = {
            projectId: 8,
            userId: 2,
            userName: 'oleg',
            userFirstName: 'user2',
            userLastName: 'user2',
            userType: 'user',
            messages: [],
        };
    }

    loginUser() {
        const user = {
            //userEmail: 'mr.prokipchukk@gmail.com',
            userEmail: 'user2@gmail.com',
            password: 'user2',
        };

        axios.post(`http://localhost:${this.port}/sign-in`, user, { withCredentials: true }).then(response => console.log(response))
            .then(() => this.setState(state => ({
                userId: 2,
                userFirstName: 'user2',
                userLastName: 'user2',
                userType: 'user',
            })));
    }

    loginModerator() {
        const user = {
            userEmail: 'moderator',
            password: 'moderator',
        };

        axios.post(`http://localhost:${this.port}/sign-in`, user, { withCredentials: true }).then(response => console.log(response))
            .then(() => this.setState(state => ({
                userId: 3,
                userFirstName: 'moderator',
                userLastName: 'moderator',
                userType: 'moderator',
            })));
    }

    getUser = () => axios.get('http://localhost:8091/api/v1/user', { withCredentials: true }).then((response) => {
        console.log(response.data.id);
        this.setState({ userId: response.data.id });
    });

    getMessagesFromApi() {
        const url = `http://localhost:${this.port}/api/v1/project/${this.state.projectId}/comment`;
        return axios.get(url)
            .then((response => response.data));
    }

    initAssignedUsers = () => {
        const url = `http://localhost:${this.port}/api/v1/user/${this.state.projectId}/roles`;
        return axios.get(url).then((response) => {
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

        return axios.all(messagesPromises).then(axios.spread((...args) => args.map(response =>
        // console.log(response);
            response)));
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
            const response = await axios.get(url);
            this.users[userId] = response.data;
            return response.data;
        }

        return this.users[userId];
    }

    updateMessagesFunc = () => {
        console.log('update');
        this.initAssignedUsers().then(() => {
            this.needScroll = false;
            this.initMessages();
            this.messagesUpdateTimeout = setTimeout(this.updateMessagesFunc, this.messagesUpdateTime);
        });
    };

    componentDidMount() {
        this.loginUser();
        this.initAssignedUsers().then(() => {
            this.initMessages().then(() => {
                this.messagesUpdateTimeout = setTimeout(this.updateMessagesFunc, this.messagesUpdateTime);
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
        if (textMessage == null || textMessage === undefined || textMessage === '') return;

        this.needScroll = true;

        const newMessage = {
            text: textMessage,
            fromUser: (this.state.userType === 'user'),
            name: `${this.state.userFirstName} ${this.state.userLastName}<${this.state.userType}>`,
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
        }, 1000);
        /* axios.post(newCommentUrl, newCommentData, {withCredentials: true}).then((respone) => {
            let messageDateBefore = new Date(Date.parse(respone.data.date));
            let messageDateAfter =  [
                    messageDateBefore.getDate(),
                    (messageDateBefore.getMonth()+1),
                    messageDateBefore.getFullYear()].join('.') +' ' +
                [messageDateBefore.getHours(),
                    messageDateBefore.getMinutes()].join(':');
            //this.needScroll = true;
            this.newMessageRef.current.onMessageSent(respone.data, newMessage, messageDateAfter, messageDateBefore);
            this.newMessageRef = undefined;
            console.log(this.state);
            return respone.data;
        }).then(
            (comment) => {
                let pathUrl = `http://localhost:` + this.port + `/api/v1/project/`
                    + this.state.projectId
                    + `/comment/`
                    + comment.id
                    + `/notify`;
                console.log(pathUrl);
                axios.patch(pathUrl, {}, {withCredentials: true});
            }
        ); */
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
                                {this.userAmount}{' '}members
                            </div>
                        </div>
                        <div className="chat-header-description-subscribe">
                            <Subscribe port={this.port} project={this.state.projectId}/>
                        </div>
                    </div>
                </div>
                <ul id="messagesList" className="chat-messages">
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

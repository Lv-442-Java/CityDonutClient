import React from 'react';
import './message.css';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';


export class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.messageItem.id,
            userId: props.messageItem.userId,
            text: props.messageItem.text,
            updates: props.updates,
            userNames: props.userNames,
            fromUser: props.messageItem.fromUser,
            name: props.messageItem.name,
            date: props.messageItem.date,
            last: props.changeAllowed,
        };
    }

    componentDidUpdate(prevProps) {
        this.props.messageItem.text !== prevProps.messageItem.text
        && this.setState({ text: this.props.messageItem.text });
        this.props.updates !== prevProps.updates
        && this.setState({ updates: this.props.updates });
        this.props.userNames !== prevProps.userNames
        && this.setState({ userNames: this.props.userNames });
    }

    onMessageSent(message, messageObject, date, dateObject) {
        messageObject.id = message.id;
        messageObject.fromCurrent = true;
        messageObject.sent = true;
        messageObject.date = date;
        messageObject.dateObject = dateObject;
        this.setState({
            id: message.id,
            date,
            last: (new Date() - dateObject) < this.props.changeTime,
        });
    }

    getUsersReadMessage = () => {
        const currentUserId = this.state.userId;
        const messageDate = this.props.messageItem.dateObject;
        const { updates } = this.state;

        const readers = [];

        for (let i = 0; i < updates.length; i += 1) {
            if (updates[i].userId !== currentUserId) {
                const dateTime = new Date(Date.parse(updates[i].dateTime));
                const msgRead = messageDate < dateTime;
                if (msgRead) readers.push(this.state.userNames[updates[i].userId].firstName);
            }
        }

        return (
            <span className="chat-text-readers">
                {readers.length > 0 ? <span>&#128065;</span> : ''}
                {' '}
                {readers.join(', ')}
            </span>
        );
    };

    placeContextMenu() {
        if (this.state.last === true) {
            return (
                <ContextMenu id={`cont${this.state.id}`}>
                    <MenuItem
                        data={{
                            id: this.state.id,
                            action: 'edit',
                            messageObject: this.props.messageItem,
                        }}
                        onClick={this.props.contextMenuActionHandler}
                    >
                        edit
                    </MenuItem>
                    <MenuItem
                        data={{ id: this.state.id, action: 'delete' }}
                        onClick={this.props.contextMenuActionHandler}
                    >
                        delete
                    </MenuItem>
                </ContextMenu>
            );
        }
        return ('');
    }

    renderImage(isFirst, isLeft) {
        const avatarUserUrl = 'https://unite.unity.com/themes/contrib/unity_base/images/icons/other/user-default128x128.png';
        const avatarModeratorUrl = 'https://img.icons8.com/wired/2x/admin-settings-male.png';

        const avatarUrl = this.state.fromUser === true ? avatarUserUrl : avatarModeratorUrl;

        if ((isFirst === true && isLeft === true) || (isFirst === false && isLeft === false)) {
            return (
                <div className="chat-avatar">
                    <img src={avatarUrl} alt="Retail Admin" />
                </div>
            );
        }
        return ('');
    }

    render() {
        let messageLiClass = 'message-container';
        messageLiClass += this.state.fromUser ? ' chat-left' : ' chat-right';

        if (this.state.last === true) {
            return (
                <li className={messageLiClass}>
                    {this.renderImage(true, this.state.fromUser)}
                    <ContextMenuTrigger id={`cont${this.state.id}`}>
                        <div className="chat-text">
                            <div className="chat-text-header">
                                <span className="chat-text-header-name">{this.state.name}</span>
                                <span className="chat-text-header-time">{this.state.date}</span>
                            </div>
                            <div className="chat-text-message">{this.state.text}</div>
                        </div>
                        {this.getUsersReadMessage()}
                    </ContextMenuTrigger>
                    {this.renderImage(false, this.state.fromUser)}
                    {this.placeContextMenu()}
                </li>
            );
        }

        return (
            <li className={messageLiClass}>
                {this.renderImage(true, this.state.fromUser)}
                <div>
                    <div className="chat-text">
                        <div className="chat-text-header">
                            <span className="chat-text-header-name">{this.state.name}</span>
                            <span className="chat-text-header-time">{this.state.date}</span>
                        </div>
                        <div className="chat-text-message">{this.state.text}</div>
                    </div>
                    {this.getUsersReadMessage()}
                </div>
                {this.renderImage(false, this.state.fromUser)}
                {this.placeContextMenu()}
            </li>
        );
    }
}

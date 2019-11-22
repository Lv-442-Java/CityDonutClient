import React from "react";
import './message.css';
import {ContextMenu, ContextMenuTrigger, MenuItem} from "react-contextmenu";


export class Message extends React.Component{
    constructor(props) {
        super(props);
        this.constructorCalled = true;

        this.state = {
            id: props.messageItem.id,
            text : props.messageItem.text,
            fromUser : props.messageItem.fromUser,
            name : props.messageItem.name,
            date : props.messageItem.date,
            sent: props.messageItem.sent,
            last: props.changeAllowed,
        };
    }

    onMessageSent(message, messageObject, date, dateObject) {
        messageObject.id = message.id;
        messageObject.fromCurrent = true;
        messageObject.sent = true;
        messageObject.date = date;
        messageObject.dateObject = dateObject;
        this.setState({
            id: message.id,
            sent: true,
            date: date,
            dateObject:  dateObject,
            last: (new Date() - dateObject) < this.props.changeTime,
        });
    }

    placeContextMenu() {
        if (this.state.last === true) {
            return(
                <ContextMenu id={'cont' + this.state.id}>
                    <MenuItem data={{
                        id: this.state.id,
                        action: 'edit',
                        messageObject: this.props.messageItem}} onClick={this.props.contextMenuActionHandler}>
                        edit
                    </MenuItem>
                    <MenuItem data={{
                        id: this.state.id, action: 'delete'}} onClick={this.props.contextMenuActionHandler}>
                        delete
                    </MenuItem>
                </ContextMenu>
            );
        }
        else return ('');
    }

    renderImage(isFirst, isLeft) {
        let avatarUserUrl = `https://unite.unity.com/themes/contrib/unity_base/images/icons/other/user-default128x128.png`;
        let avatarModeratorUrl = `https://img.icons8.com/wired/2x/admin-settings-male.png`;
        let avatarAdminUrl = `file:///C:/My/Work/softserve/templates/chat1/Icons8-Ios7-Users-Administrator.png`;

        let avatarUrl = this.state.fromUser === true ? avatarUserUrl : avatarModeratorUrl;

        if ((isFirst === true && isLeft === true) || (isFirst === false && isLeft === false)) {
            return(
                <div className="chat-avatar">
                    <img src={avatarUrl} alt="Retail Admin"/>
                </div>
            );
        }
        else return('');
    }

    render() {
        let messageLiClass = "message-container";
        messageLiClass += this.state.fromUser ? " chat-left" : " chat-right";
        this.state.text = this.props.messageItem.text;

        if (this.state.last === true) {
            return (
                <li className={messageLiClass}>
                    {this.renderImage(true, this.state.fromUser)}
                    <ContextMenuTrigger id={'cont' + this.state.id}>
                        <div className="chat-text">
                            <div className="chat-text-header">
                                <span className="chat-text-header-name">{this.state.name}</span>
                                <span className="chat-text-header-time">{this.state.date}</span>
                            </div>
                            <div className="chat-text-message">{this.state.text}</div>
                        </div>
                    </ContextMenuTrigger>
                    {this.renderImage(false, this.state.fromUser)}
                    {this.placeContextMenu()}
                </li>
            );
        }
        else {
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
                    </div>
                    {this.renderImage(false, this.state.fromUser)}
                    {this.placeContextMenu()}
                </li>
            );
        }
    }
}
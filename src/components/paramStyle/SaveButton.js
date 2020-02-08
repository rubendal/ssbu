import React, { Component } from 'react';

export default class SaveButton extends React.Component {
    constructor() {
        super();
        this.state = {showMsg: false};
        this.timerID = null;
    }
    onClick() {
        this.props.onClick();
        this.setState({showMsg: true});
        if (this.timerID) {
            clearTimeout(this.timerID);
        }
        this.timerID = setTimeout(() => this.setState({showMsg: false}), 2000);
    }
    render() {
        return (
            <span>
                <button type="button" value="save" onClick={this.onClick.bind(this)} >
                    save
                </button>
                <span className="config-saved">
                    { this.state.showMsg && "saved!" }
                </span>
            </span>
        );
    }
}

import React, { Component } from 'react';

export default class ParamStyleConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {showConfig: false};
    }
    setShowConfig(show) {
        this.setState({showConfig: show});
    }
    render() {
        const handler = this.props.handler;
        return handler.createConfigDiv(this.state.showConfig, this.setShowConfig.bind(this));
    }
}

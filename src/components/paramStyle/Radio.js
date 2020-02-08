import React, { Component } from 'react';

import {StyleList} from './ParamStyleHandler';

export default class Radio extends React.Component {
    handleChange(e) {
        let style = e.target.value;
        this.props.setStyle(style);
    }
    createLabel(style) {
        return (
            <td key={style}>
                <label className={"label-param-style-" + style}>
                    <input type="radio" name={"style-" + this.props.name} value={style}
                           onChange={this.handleChange.bind(this)}
                           checked={this.props.defaultStyle === style} />
                    <span>
                        {style}
                    </span>
                </label>
            </td>
        );
        /* <span>{style}</span> の部分は，style の情報がちゃんと分かれば何でも良い */
    }
    createLabelList() {
        return StyleList.map(style => this.createLabel(style));
    }
    render() {
        let inputName = "style-" + this.props.name;
        return (
            <tr key={this.props.name}>
                <td className="param-name">
                    {this.props.name}
                </td>
                {this.createLabelList()}
            </tr>
        );
    }
}

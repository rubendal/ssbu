import React, { Component } from 'react';

class SaveButton extends React.Component {
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
                <input type="button" value="save" onClick={this.onClick.bind(this)} />
                { this.state.showMsg && <span>saved!</span> }
            </span>
        );
    }
}

const StyleList = ["hide", "default", "highlight1", "highlight2"];

class Radio extends React.Component {
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

class ParamStyleHandler {
    constructor(getStyle, setStyle) {
        this.paramNames = ["ID", "Part", "Bone", "Damage", "Angle", "KBG", "FKB", "BKB", "Size", "X", "Y", "Z", "Hitlag", "SDI", "Clang/Rebound", "FacingRestrict", "SetWeight", "ShieldDamage", "Trip", "Rehit", "Reflectable", "Absorbable", "Flinchless", "DisableHitlag", "Direct/Indirect", "Ground/Air", "Hitbits", "CollisionPart", "FriendlyFire", "Effect", "SFXLevel", "SFXType", "Type"];
        this.localStorageKey = "ssbu-param-styles";
        this.getStyle = getStyle;
        this.setStyle = setStyle;
    }
    getDefaultStyles() {
        const styles = JSON.parse(localStorage.getItem(this.localStorageKey)) || {};
        this.paramNames.forEach(name => {
            if (styles[name] === undefined) {
                styles[name] = "default";
            }
        });
        return styles;
    }
    setAll(value) {
        this.paramNames.forEach(name => {this.setStyle(name, value)});
    }
    createSelectAllButton(style) {
        return (
            <td key={style}>
                <button type="button" value={style}
                        onClick={e => this.setAll(e.target.value)}>
                    {style}
                </button>
            </td>
        )
    }
    createSelectAllButtonList() {
        return StyleList.map(style => this.createSelectAllButton(style));
    }
    createRadio(name) {
        if (!this.paramNames.includes(name)) {
            throw `The name "${name}" is not recognized by ParamStyleHandler`;
        }
        return (
            <Radio name={name} key={name}
                   setStyle={style => this.setStyle(name, style)}
                   defaultStyle={this.getStyle(name)} />
        );
    }
    createRadioList() {
        return this.paramNames.map(name => this.createRadio(name));
    }
    save() {
        const obj = {};
        this.paramNames.forEach(name => {obj[name] = this.getStyle(name);});
        localStorage.setItem(this.localStorageKey, JSON.stringify(obj));
    }
    createSaveButton() {
        return <SaveButton onClick={this.save.bind(this)}/>
    }
    createTable() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            select all
                        </td>
                        {this.createSelectAllButtonList()}
                    </tr>
                    {this.createRadioList()}
                </tbody>
            </table>
        );
    }
    createCloseButton(setShowConfig) {
        return (
            <button type="button" onClick={() => setShowConfig(false)}>
                close
            </button>
        );
    }
    createConfigDiv(showConfig, setShowConfig) {
        if (showConfig) {
            return (
                <div className="param-style-config">
                    <div>
                        {this.createSaveButton()}
                        {this.createCloseButton(setShowConfig)}
                    </div>
                    {this.createTable()}
                </div>
            );
        } else {
            return (
                <button type="button" onClick={() => setShowConfig(true)}>
                    config
                </button>
            );
        }
    }
}

class ParamStyleConfig extends Component {
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

export {ParamStyleHandler, ParamStyleConfig};

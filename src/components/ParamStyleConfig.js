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
            <div>
                <input type="button" value="save" onClick={this.onClick.bind(this)} />
                { this.state.showMsg && <span>saved!</span> }
            </div>
        );
    }
}

class Radio extends React.Component {
    handleChange(e) {
        let style = e.target.value;
        this.props.setStyle(style);
    }
    createLabel(style) {
        return (
            <label className={"label-param-style-" + style}>
                <input type="radio" name={"style-" + this.props.name} value={style}
                       onChange={this.handleChange.bind(this)}
                       checked={this.props.defaultStyle === style} />
                <span>
                    {style}
                </span>
            </label>
        );
        /* <span>{style}</span> の部分は，style の情報がちゃんと分かれば何でも良い */
    }
    render() {
        let inputName = "style-" + this.props.name;
        return (
            <div>
                {this.props.name}
                {this.createLabel("hide")}
                {this.createLabel("default")}
                {this.createLabel("highlight")}
            </div>
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
    createSelectAllButtons() {
        return (
            <div>
                <button type="button" value="hide" onClick={e => this.setAll(e.target.value)} >
                    hide
                </button>
                <button type="button" value="default" onClick={e => this.setAll(e.target.value)} >
                    default
                </button>
                <button type="button" value="highlight" onClick={e => this.setAll(e.target.value)} >
                    highlight
                </button>

            </div>
        )
    }
    createRadio(name) {
        if (!this.paramNames.includes(name)) {
            throw `The name "${name}" is not recognized by ParamStyleHandler`;
        }
        return (
            <Radio name={name} key={name}
                   setStyle={(style) => this.setStyle(name, style)}
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
}

class ParamStyleConfig extends Component {
    render() {
        const handler = this.props.handler;
        return (
            <div className="param-style-config">
                {handler.createSaveButton()}
                {handler.createSelectAllButtons()}
                {handler.createRadioList()}
            </div>
        )
    }
}

export {ParamStyleHandler, ParamStyleConfig};

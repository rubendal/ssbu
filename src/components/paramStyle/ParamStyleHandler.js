import React from 'react';
import SaveButton from './SaveButton';
import Radio from './Radio.js';

export const StyleList = ["default", "1", "2", "3", "hide"];

export default class ParamStyleHandler {
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
            <button className="close-button" type="button" onClick={() => setShowConfig(false)}>
                close
            </button>
        );
    }
    createConfigDiv(showConfig, setShowConfig) {
        if (showConfig) {
            return (
                <div className="param-style-config">
                    <div>
                        {this.createCloseButton(setShowConfig)}
                        {this.createSaveButton()}
                    </div>
                    {this.createTable()}
                </div>
            );
        } else {
            return (
                <button className="config-button" type="button" onClick={() => setShowConfig(true)}>
                    config
                </button>
            );
        }
    }
}

import React, { Component } from 'react';

class NavigationHeader extends Component {
    constructor(props){
        super(props);

        this.state = {
            version : null,
            diff : null
        };

        this.CharacterLink = "#/Character";
        this.StageLink = "#/Stage";
        this.ScriptSearchLink = "#/ScriptSearch";

        if(props.match !== undefined && props.match.params.patch !== undefined){
            this.state.version = props.match.params.patch
            this.CharacterLink = "#/Patch/" + props.match.params.patch + "/Character";
            this.StageLink = "#/Patch/" + props.match.params.patch + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }
        if(props.match !== undefined && props.match.params.diff !== undefined){
            this.state.diff = props.match.params.diff;
            this.CharacterLink = "#/Diff/" + props.match.params.diff + "/Character";
        }
    }

    shouldComponentUpdate(props, state){
        if(state.version !== null && props.match !== undefined){
            this.CharacterLink = "#/Patch/" + props.match.params.patch + "/Character";
            this.StageLink = "/#Patch/" + props.match.params.patch + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }else{
            this.CharacterLink = "#/Character";
            this.StageLink = "#/Stage";
            this.ScriptSearchLink = "#/ScriptSearch";
        }
        if(state.diff !== null  && props.match !== undefined){
            this.CharacterLink = "#/Diff/" + props.match.params.diff + "/Character";
        }else{
            this.CharacterLink = "#/Character";
        }
        return true;
    }

    static getDerivedStateFromProps(props, state) {
        var newState = {
            version : null,
            diff : null
        }
        if (props.match.params.patch !== undefined) {
            newState.version = props.match.params.patch;
        }else{
            newState.version = null;
        }
        if (props.match.params.diff !== undefined) {
            newState.diff = props.match.params.diff;
        }else{
            newState.diff = null;
        }
        return newState;
	  }

    render() {
        return (
        <div className="navigation-header">
            <span className="navigation-link">
                <a href="#/" className="hide-link">Home</a>
            </span>

            <span className="navigation-link">
                <a href={this.CharacterLink} className="hide-link">{this.state.version !== null ? "Characters (v" + this.state.version + ")" : "Characters"}</a>
            </span>

            <span className="navigation-link">
                <a href={this.StageLink} className="hide-link">{this.state.version !== null ? "Stages (v" + this.state.version + ")" : "Stages"}</a>
            </span>

            <span className="navigation-link">
                <a href="#/Patch" className="hide-link">Patches</a>
            </span>

            <span className="navigation-link">
                <a href={this.ScriptSearchLink} className="hide-link">{this.state.version !== null ? "Script Search (v" + this.state.version + ")" : "Script Search"}</a>
            </span>
            
        </div>
        );
      }
}

export default NavigationHeader;

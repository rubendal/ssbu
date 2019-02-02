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
            //this.StageLink = "#/Patch/" + props.match.params.patch + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }
        if(props.match !== undefined && props.match.params.diff !== undefined){
            this.state.diff = props.match.params.diff;
            this.CharacterLink = "#/Diff/" + props.match.params.diff + "/Character";
        }
    }

    shouldComponentUpdate(props, state){
        if(state.version !== null){
            this.CharacterLink = "#/Patch/" + state.version + "/Character";
            //this.StageLink = "/#Patch/" + state.version + "/Stage";
            this.ScriptSearchLink = "#/Patch/" + props.match.params.patch + "/ScriptSearch";
        }else{
            this.CharacterLink = "#/Character";
            this.StageLink = "#/Stage";
            this.ScriptSearchLink = "#/ScriptSearch";
        }
        if(state.diff !== null){
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
        }
        if (props.match.params.diff !== undefined) {
            newState.diff = props.match.params.diff;
        }
        if(props.match.params.patch !== undefined || props.match.params.diff !== undefined){
            return newState;
        }

		return null;
	  }

    render() {
        return (
        <div className="navigation-header">
            <span className="navigation-link">
                <a href="#/" className="hide-link">Home</a>
            </span>
            <span className="navigation-link">
                <a href={this.CharacterLink} className="hide-link">{this.state.version !== null ? "Characters (v" + this.state.version + ")" : (this.state.diff !== null ? "Characters (" + this.state.diff + ")" : "Characters")}</a>
            </span>
            <span className="navigation-link">
                <a href={this.StageLink} className="hide-link">Stages</a>
            </span>
            
        </div>
        );
      }
}

export default NavigationHeader;

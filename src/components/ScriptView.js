import React, { Component } from 'react';
import { ToHex, IsScriptEmpty, BuildScript } from '../util/util';
import Parser from 'html-react-parser';
import HitboxesView from './HitboxesView';
import HurtboxModeView from './HurtboxStateView';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ParserVersion from '../assets/tools_version.json';
import ParamStyleConfig from './ParamStyleConfig';
import ParamStyleHandler from './paramStyle/ParamStyleHandler';
import $ from 'jquery'

class ScriptView extends Component {
    constructor(props) {
        super(props);

        const paramStyleHandler = new ParamStyleHandler(this.getParamStyle.bind(this), this.setParamStyle.bind(this));
        this.state = {
            script: props.script,
            WeightDependentThrows: props.WeightDependentThrows,
            paramStyleHandler: paramStyleHandler,
            paramStyles: paramStyleHandler.getDefaultStyles()
        };
    }

    //Jquery to uncheck all other description display on load
    componentDidMount(){
        $('input[type=checkbox]').on('click', function(e){
            if($(this).prop('checked')){
                $('input[type=checkbox]').not(this).prop('checked',false);
            }
        })
    }

    //Jquery to uncheck all other description display on script change
    componentDidUpdate(){
        $('input[type=checkbox]').on('click', function(e){
            if($(this).prop('checked')){
                $('input[type=checkbox]').not(this).prop('checked',false);
            }
        })
    }

    getParamStyle(name) {
        return this.state.paramStyles[name];
    }

    setParamStyle(name, style) {
        this.setState({style: Object.assign(this.state.paramStyles, {[name]: style})});
    }

    /*toggleDiv(id){
      var element = document.getElementById(id);
          if(element!==null)
              element.classList.toggle("hidden");
    }*/

    static getDerivedStateFromProps(props, state) {
        if (props.script !== state.script) {
            return {
                script: props.script
            };
        }
        
        return null;
    }

    render() {
        return (
            <div className="script-container">
                {
                    !IsScriptEmpty(this.state.script) && (
                        <div className="script-div">
                            <div id={"script-" + this.state.script.Id} className="script">
                                {Parser(BuildScript(this.state.script.Data, this.state.paramStyles))}
                            </div>
                            <span className="parser-version">
                                <a href={ParserVersion.parser_link}>
                                    Parser commit {ParserVersion.parser}
                                </a>
                            </span>
                        </div>
                    )
                }
                <ParamStyleConfig handler={this.state.paramStyleHandler} />
            </div>
        );
    }
}

export default ScriptView;

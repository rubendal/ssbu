import React, { Component } from 'react';
import { ToHex, IsScriptEmpty, BuildScript } from '../util/util';
import Parser from 'html-react-parser';
import HitboxesView from './HitboxesView';
import HurtboxModeView from './HurtboxStateView';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import ParserVersion from '../assets/tools_version.json';

class ScriptView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            script: props.script,
            WeightDependentThrows: props.WeightDependentThrows
        };
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
            <div>
                <br />
                {
                    !IsScriptEmpty(this.state.script) && (
                        <div>
                            <div id={"script-" + this.state.script.Id} className="script">
                                {Parser(BuildScript(this.state.script.Data))}
                            </div>
                            <span className="parser-version">
                                <a href={ParserVersion.parser_link}>
                                    Parser commit {ParserVersion.parser}
                                </a>
                            </span>
                        </div>
                    )
                }

            </div>
        );
    }
}

export default ScriptView;
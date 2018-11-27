import React, { Component } from 'react';
import {ToHex, IsScriptEmpty, BuildScript} from '../util/util';
import Parser from 'html-react-parser';
import HitboxesView from './HitboxesView';
import HurtboxModeView from './HurtboxStateView';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import SALTVersion from '../assets/tools_version.json';

class ScriptView extends Component {
  constructor(props){
    super(props);

    this.state = {
        script : props.script,
        WeightDependentThrows : props.WeightDependentThrows
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
          script : props.script
      };
    }

    return null;
  }

  render() {
    return (
      <div>
          {
              (this.state.script.Article === "body" && (
                  <h3>{this.state.script.AnimationName}</h3>
              ))
          }
          {
              (this.state.script.Article !== "body" && (
                  <h3>{this.state.script.Article}/{this.state.script.AnimationName}</h3>
              ))
          }

        <div className="script-data">
        <table>
            <tbody>
            <tr>
                <td>
                    Subaction index
                </td>
                <td>
                    {this.state.script.SubactionIndex}
                </td>
            </tr>
            {
                this.state.script.AnimationName !== ToHex(this.state.script.Hash) && (
                    <tr>
                        <td>
                            Hash
                        </td>
                        <td>
                            {ToHex(this.state.script.Hash)}
                        </td>
                    </tr>
                )
            }
            {
                this.state.script.Animation !== null && this.state.script.AnimationLength !== this.state.script.Animation.Length && (
                <tr>
                    <td>
                        Animation Length (without FSM)
                    </td>
                    <td>
                        {this.state.script.Animation.Length} frames
                    </td>
                </tr>
            )
            }
            {
                this.state.script.FAF !== this.state.script.Params.FAF && (
                <tr>
                    <td>
                        FAF (without FSM)
                    </td>
                    <td>
                        {this.state.script.Params.FAF}
                    </td>
                </tr>
            )
            }
            {
                this.state.script.AnimationLength !== 0 && (
                <tr>
                    <td>
                        Animation Length
                    </td>
                    <td>
                        {this.state.script.AnimationLength} frames
                    </td>
                </tr>
                )
            }
            {
                this.state.script.FAF !== 0 && (
                <tr>
                    <td>
                        FAF
                    </td>
                    <td>
                        {this.state.script.FAF}
                    </td>
                </tr>
                )
            }
            {
                this.state.script.Params !== null && this.state.script.Params.IntangibilityStart !== 0 && (

                    <tr>
                        <td>
                        Intangibility Start Frame
                        </td>
                        <td>
                            {this.state.script.Params.IntangibilityStart}
                        </td>
                    </tr>
                )
            }
            {
                this.state.script.Params !== null && this.state.script.Params.IntangibilityEnd !== 0 && (

                    <tr>
                        <td>
                        Intangibility End Frame
                        </td>
                        <td>
                            {this.state.script.Params.IntangibilityEnd}
                        </td>
                    </tr>
                )
            }
            {
                this.state.script.Params !== null && this.state.script.Article === "body" && (

                    <tr>
                        <td>
                        Animates during hitlag
                        </td>
                        <td>
                            {this.state.script.Params.DisableHitlagAnimation ? "No" : (
                                <OverlayTrigger placement="top" overlay={
                                    <Tooltip id={"DisableAnimationTooltip"}>
                                        Character continues animation with a slowdown applied (Frame speed = 0.25 * (1/hitlag frames))
                                        <br/>
                                        This also allows aerials to be able to frame sync
                                    </Tooltip>}>
                                        <span className="dot-underline">Yes</span>
                                </OverlayTrigger>
                            )}
                        </td>
                    </tr>
                )
            }
        </tbody>
        </table>
        </div>

        {
            this.state.script.HurtboxesStates !== undefined && this.state.script.HurtboxesStates.length > 0 && (
                <HurtboxModeView list={this.state.script.HurtboxesStates}></HurtboxModeView>
            )
        }

        {
            this.state.script.Hitboxes.length > 0 && (
                <HitboxesView scriptId={this.state.script.Id} scriptName={this.state.script.AnimationName} hitboxes={this.state.script.Hitboxes} weightDependentThrows={this.state.WeightDependentThrows}></HitboxesView>
            )
        }

        {
            !IsScriptEmpty(this.state.script) && (
            <div>
                <h4>Animcmd</h4>
                <div id={"script-" + this.state.script.Id} className="script">
                    {Parser(BuildScript(this.state.script))}
                </div>
                <span className="salt-version">
                    <a href={SALTVersion.salt_link}>
                        SALT commit {SALTVersion.salt}
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
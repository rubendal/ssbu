import React, { Component } from 'react';
import {ToHexWithoutPadding, PrintHitboxActive, ParseRemoveType, ParseEffect, ParseScriptCondition} from '../../../util/util'
import '../../../assets/css/characters.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import BooleanView from './BooleanView';
import Parser from 'html-react-parser';

class HitboxData extends Component {
  constructor(props){
    super(props);

    this.hitbox = props.hitbox;

    this.removeType = "";
    
    switch (this.hitbox.RemoveType)
    {
        case 0: //Removed
            this.removeTitle = "Hitbox is removed through Remove_Hitbox event, hitbox with same ID on later frames can hit opponents that were hit with this hitbox";
            break;
        case 1: //Overwritten
            this.removeTitle = "Hitbox is overwritten with a hitbox with same ID, new hitbox won't hit opponents that were hit with this hitbox";
            break;
        case 2: //Updated
            this.removeTitle = "Hitbox has some parameter values changed, new hitbox won't hit opponents that were hit with this hitbox";
            break;
        case 3: //ThrowApplier

        break;
        case 4: //Script_End()
            this.removeTitle = "Hitbox is still active when Script_End() is called, it will last until animation ends or removed on next animation";
        break;
        default:

        break;
    }

    this.dataTooltip = null;

    if(this.hitbox.SetWeight){
        if(this.dataTooltip !== null)
            this.dataTooltip += "<br/>";
            else
            this.dataTooltip = "";
        this.dataTooltip += `Set Weight hitbox`;
    }
    if(this.hitbox.SetGravityFallSpeed !== null){
        if(this.dataTooltip !== null)
            this.dataTooltip += "<br/>";
            else
            this.dataTooltip = "";
        this.dataTooltip += `Gravity set to 0.087 and Fall speed set to 1.5 for ${this.hitbox.SetGravityFallSpeed} frames`;
    }
    if(this.hitbox.Condition !== null && this.hitbox.Condition.Id !== 0){
        if(this.dataTooltip !== null)
            this.dataTooltip += "<br/>";
            else
            this.dataTooltip = "";
        this.dataTooltip += `${this.hitbox.Condition.Block ? "True" : "False"}(Variable ${ToHexWithoutPadding(this.hitbox.Condition.Variable)} ${ParseScriptCondition(this.hitbox.Condition.Condition, this.hitbox.Condition.Value)})`;
    }
  }


  render() {
    return (
      <React.Fragment>
          {
                this.dataTooltip === null && (
                    <td>{PrintHitboxActive(this.hitbox.HitboxActive)}</td>
                )
            }
            {
                this.dataTooltip !== null && (
                    <td>
                    <OverlayTrigger placement="top" overlay={
                        <Tooltip id={`id-${this.hitbox.Id}`}>
                            {Parser(this.dataTooltip)}
                        </Tooltip>}>
                            <span className="dot-underline">{PrintHitboxActive(this.hitbox.HitboxActive)}</span>
                    </OverlayTrigger>
                    </td>
                )
            }
            {
                this.removeTitle !== "" && (
                    <td>
                        <OverlayTrigger placement="top" overlay={
                        <Tooltip id={this.hitbox.Id}>
                            {this.removeTitle}
                        </Tooltip>}>
                            <span className="dot-underline">{ParseRemoveType(this.hitbox.RemoveType)}</span>
                        </OverlayTrigger>
                    </td>
                )
            }
            {
                this.removeTitle === "" && (
                    <td><span>{ParseRemoveType(this.hitbox.RemoveType)}</span></td>
                )
            }
            <td>{this.hitbox.HitboxId}</td>
            <td>{this.hitbox.Part}</td>
            <td>{ToHexWithoutPadding(this.hitbox.Bone)}</td>
            <td>{this.hitbox.Damage}</td>
            <td>{this.hitbox.Angle}</td>
            <td>{this.hitbox.KBG}</td>
            <td>{this.hitbox.WBKB}</td>
            <td>{this.hitbox.BKB}</td>
            <td>{this.hitbox.Size}</td>
            <td>{this.hitbox.X}</td>
            <td>{this.hitbox.Y}</td>
            <td>{this.hitbox.Z}</td>
            <td>{ParseEffect(this.hitbox.Effect)}</td>
            <td>{this.hitbox.Trip * 100}%</td>
            <td>{this.hitbox.Hitlag}</td>
            <td>{this.hitbox.SDI}</td>
            <BooleanView value={this.hitbox.Clang}/>
            <BooleanView value={this.hitbox.Rebound}/>
            <td>{this.hitbox.ShieldDamage}</td>
            <td>{this.hitbox.SFXLevel}</td>
            <td>{ToHexWithoutPadding(this.hitbox.SFX)}</td>
            <BooleanView value={this.hitbox.HitsGrounded}/>
            <BooleanView value={this.hitbox.HitsAerial}/>
            <BooleanView value={this.hitbox.IgnoresDowned}/>
            <td>{this.hitbox.DirectIndirect}</td>
            <td>{this.hitbox.Type}</td>
            <td>{ToHexWithoutPadding(this.hitbox.HitBits)}</td>
      </React.Fragment>
    );
  }
}

export default HitboxData;

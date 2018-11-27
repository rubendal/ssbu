import React, { Component } from 'react';
import {ToHexWithoutPadding, ParseRemoveType, ParseEffect} from '../../../util/util'
import '../../../assets/css/characters.css';
import BooleanView from './BooleanView';

class ThrowData extends Component {
  constructor(props){
    super(props);

    this.hitbox = props.hitbox;

    this.removeType = "";
  }


  render() {
    return (
      <React.Fragment>
            <td>{this.hitbox.HitboxActive.Start === 0 ? this.hitbox.HitboxActive.Start + 1 : this.hitbox.HitboxActive.Start}</td>
            <td>{this.hitbox.HitboxActive.End > 0 ? this.hitbox.HitboxActive.End.toString() : "-"}</td>
            <td><span>{ParseRemoveType(this.hitbox.RemoveType)}</span></td>
            <td>{this.hitbox.HitboxId}</td>
            <td>{ToHexWithoutPadding(this.hitbox.Bone)}</td>
            <td>{this.hitbox.Damage}</td>
            <td>{this.hitbox.Angle}</td>
            <td>{this.hitbox.KBG}</td>
            <td>{this.hitbox.WBKB}</td>
            <td>{this.hitbox.BKB}</td>
            <td>{ParseEffect(this.hitbox.Effect)}</td>
            <td>{this.hitbox.Hitlag}</td>
            <td>{this.hitbox.SFXLevel}</td>
            <td>{ToHexWithoutPadding(this.hitbox.SFX)}</td>
            <td>{this.hitbox.FacingRestriction}</td>
            <BooleanView value={this.hitbox.DisableHitlag}/>
            <td>{this.hitbox.Type}</td>
      </React.Fragment>
    );
  }
}

export default ThrowData;

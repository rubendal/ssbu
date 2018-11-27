import React, { Component } from 'react';
import '../../../assets/css/characters.css';
import BooleanView from './BooleanView';

class SpecialHitboxData extends Component {
  constructor(props){
    super(props);

    this.hitbox = props.hitbox;
  }


  render() {
    return (
      <React.Fragment>
        <td>{this.hitbox.Rehit}</td>
        <td>{this.hitbox.FacingRestriction}</td>
        <BooleanView value={this.hitbox.Blockable}/>
        <BooleanView value={this.hitbox.Reflectable}/>
        <BooleanView value={this.hitbox.Absorbable}/>
        <BooleanView value={this.hitbox.IgnoreInvulnerability}/>
        <BooleanView value={this.hitbox.TeamDamage}/>
        <BooleanView value={this.hitbox.Flinchless}/>
        <BooleanView value={this.hitbox.DisableHitlag}/>
        <BooleanView value={this.hitbox.NoGFX}/>
      </React.Fragment>
    );
  }
}

export default SpecialHitboxData;

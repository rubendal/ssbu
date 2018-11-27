import React, { Component } from 'react';
import {ToHexWithoutPadding, PrintHitboxActive, ParseRemoveType} from '../../../util/util'
import '../../../assets/css/characters.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import BooleanView from './BooleanView';

class GrabData extends Component {
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
  }


  render() {
    return (
      <React.Fragment>
            <td>{PrintHitboxActive(this.hitbox.HitboxActive)}</td>
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
            <td>{ToHexWithoutPadding(this.hitbox.Bone)}</td>
            <td>{this.hitbox.Size}</td>
            <td>{this.hitbox.X}</td>
            <td>{this.hitbox.Y}</td>
            <td>{this.hitbox.Z}</td>
            <BooleanView value={this.hitbox.HitsGrounded}/>
            <BooleanView value={this.hitbox.HitsAerial}/>
      </React.Fragment>
    );
  }
}

export default GrabData;

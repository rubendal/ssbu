import React, { Component } from 'react';
import '../../../assets/css/characters.css';

class ExtendedHitboxData extends Component {
  constructor(props){
    super(props);

    this.hitbox = props.hitbox;
  }


  render() {
    return (
      <React.Fragment>
            <td>{this.hitbox.X2}</td>
            <td>{this.hitbox.Y2}</td>
            <td>{this.hitbox.Z2}</td>
      </React.Fragment>
    );
  }
}

export default ExtendedHitboxData;

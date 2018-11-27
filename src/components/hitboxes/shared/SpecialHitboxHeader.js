import React, { Component } from 'react';

class SpecialHitboxHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <td>Rehit</td>
        <td>Facing Restriction</td>
        <td>Blockable</td>
        <td>Reflectable</td>
        <td>Absorbable</td>
        <td>Ignores Invulnerability</td>
        <td>Team Damage</td>
        <td>Flinchless</td>
        <td>Hitlag Disabled</td>
        <td>No GFX</td>
      </React.Fragment>
    );
  }
}

export default SpecialHitboxHeader;

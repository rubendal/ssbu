import React, { Component } from 'react';

import HitboxView from './hitboxes/HitboxView'
import ExtendedHitboxView from './hitboxes/ExtendedHitboxView'
import SpecialHitboxView from './hitboxes/SpecialHitboxView'
import ExtendedSpecialHitboxView from './hitboxes/ExtendedSpecialHitboxView'
import CollateralHitboxView from './hitboxes/CollateralHitboxView'
import ExtendedCollateralHitboxView from './hitboxes/ExtendedCollateralHitboxView'
import GrabView from './hitboxes/GrabView'
import ExtendedGrabView from './hitboxes/ExtendedGrabView'
import ThrowView from './hitboxes/ThrowView'
import SearchCollisionView from './hitboxes/SearchCollisionView'


class HitboxesView extends Component {
  constructor(props){
    super(props);

    this.state = {
      scriptId : props.scriptId,
      scriptName : props.scriptName,
      WeightDependentThrows : props.weightDependentThrows,
      Hitboxes : props.hitboxes.filter(h => h.$type === "Hitbox"),
      SpecialHitboxes : props.hitboxes.filter(h => h.$type === "SpecialHitbox"),
      ExtendedHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedHitbox"),
      ExtendedSpecialHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedSpecialHitbox"),
      CollateralHitboxes : props.hitboxes.filter(h => h.$type === "CollateralHitbox"),
      ExtendedCollateralHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedCollateralHitbox"),
      Grabs : props.hitboxes.filter(h => h.$type === "Grab"),
      ExtendedGrabs : props.hitboxes.filter(h => h.$type === "ExtendedGrab"),
      Throws : props.hitboxes.filter(h => h.$type === "Throw"),
      SearchCollisions : props.hitboxes.filter(h => h.$type === "SearchCollision")
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.scriptId !== state.scriptId) {
      return {
        scriptId : props.scriptId,
        scriptName : props.scriptName,
        Hitboxes : props.hitboxes.filter(h => h.$type === "Hitbox"),
        SpecialHitboxes : props.hitboxes.filter(h => h.$type === "SpecialHitbox"),
        ExtendedHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedHitbox"),
        ExtendedSpecialHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedSpecialHitbox"),
        CollateralHitboxes : props.hitboxes.filter(h => h.$type === "CollateralHitbox"),
        ExtendedCollateralHitboxes : props.hitboxes.filter(h => h.$type === "ExtendedCollateralHitbox"),
        Grabs : props.hitboxes.filter(h => h.$type === "Grab"),
        ExtendedGrabs : props.hitboxes.filter(h => h.$type === "ExtendedGrab"),
        Throws : props.hitboxes.filter(h => h.$type === "Throw"),
        SearchCollisions : props.hitboxes.filter(h => h.$type === "SearchCollision")
      };
    }

    return null;
  }


  render() {
    return (
      <div id={`hitboxesView-${this.state.scriptId}`} className="script-hitboxes-data">
        {
          this.state.Hitboxes.length > 0 && (
            <HitboxView hitboxes={this.state.Hitboxes}></HitboxView>
          )
        }
        {
          this.state.SpecialHitboxes.length > 0 && (
            <SpecialHitboxView hitboxes={this.state.SpecialHitboxes}></SpecialHitboxView>
          )
        }
        {
          this.state.ExtendedHitboxes.length > 0 && (
            <ExtendedHitboxView hitboxes={this.state.ExtendedHitboxes}></ExtendedHitboxView>
          )
        }
        {
          this.state.ExtendedSpecialHitboxes.length > 0 && (
            <ExtendedSpecialHitboxView hitboxes={this.state.ExtendedSpecialHitboxes}></ExtendedSpecialHitboxView>
          )
        }
        {
          this.state.CollateralHitboxes.length > 0 && (
            <CollateralHitboxView hitboxes={this.state.CollateralHitboxes}></CollateralHitboxView>
          )
        }
        {
          this.state.ExtendedCollateralHitboxes.length > 0 && (
            <ExtendedCollateralHitboxView hitboxes={this.state.ExtendedCollateralHitboxes}></ExtendedCollateralHitboxView>
          )
        }
        {
          this.state.Grabs.length > 0 && (
            <GrabView hitboxes={this.state.Grabs}></GrabView>
          )
        }
        {
          this.state.ExtendedGrabs.length > 0 && (
            <ExtendedGrabView hitboxes={this.state.ExtendedGrabs}></ExtendedGrabView>
          )
        }
        {
          this.state.Throws.length > 0 && (
            <ThrowView hitboxes={this.state.Throws} scriptName={this.state.scriptName} WeightDependentThrows={this.state.WeightDependentThrows}></ThrowView>
          )
        }
        {
          this.state.SearchCollisions.length > 0 && (
            <SearchCollisionView hitboxes={this.state.SearchCollisions}></SearchCollisionView>
          )
        }
      </div>
    );
  }
}

export default HitboxesView;

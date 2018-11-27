import React, { Component } from 'react';
import HitboxHeader from './shared/HitboxHeader';
import HitboxData from './shared/HitboxData';
import ExtendedHitboxHeader from './shared/ExtendedHitboxHeader';
import ExtendedHitboxData from './shared/ExtendedHitboxData';

class ExtendedCollateralHitboxView extends Component {
  constructor(props){
    super(props);

    this.state = {
        hitboxes : props.hitboxes
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.hitboxes !== state.hitboxes) {
      return {
        hitboxes : props.hitboxes
      };
    }

    return null;
  }

  render() {
    return (
      <div>
        <h4>Extended Collateral Hitbox</h4>
        <table className="hitbox-table">
            <thead>
                <tr>
                    <HitboxHeader/>
                    <ExtendedHitboxHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <HitboxData hitbox={hitbox}></HitboxData>
                                <ExtendedHitboxData hitbox={hitbox}></ExtendedHitboxData>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
      </div>
    );
  }
}

export default ExtendedCollateralHitboxView;

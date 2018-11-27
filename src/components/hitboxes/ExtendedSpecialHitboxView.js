import React, { Component } from 'react';
import HitboxHeader from './shared/HitboxHeader';
import HitboxData from './shared/HitboxData';
import ExtendedHitboxHeader from './shared/ExtendedHitboxHeader';
import ExtendedHitboxData from './shared/ExtendedHitboxData';
import SpecialHitboxHeader from './shared/SpecialHitboxHeader';
import SpecialHitboxData from './shared/SpecialHitboxData';

class ExtendedSpecialHitboxView extends Component {
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
        <h4>Extended Special Hitbox</h4>
        <table className="hitbox-table">
            <thead>
                <tr>
                    <HitboxHeader/>
                    <SpecialHitboxHeader/>
                    <ExtendedHitboxHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <HitboxData hitbox={hitbox}></HitboxData>
                                <SpecialHitboxData hitbox={hitbox}></SpecialHitboxData>
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

export default ExtendedSpecialHitboxView;

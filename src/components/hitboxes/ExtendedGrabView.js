import React, { Component } from 'react';
import GrabHeader from './shared/GrabHeader';
import GrabData from './shared/GrabData';
import ExtendedHitboxHeader from './shared/ExtendedHitboxHeader';
import ExtendedHitboxData from './shared/ExtendedHitboxData';


class ExtendedGrabView extends Component {
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
        <h4>Grabboxes</h4>
        <table className="hitbox-table">
            <thead>
                <tr>
                    <GrabHeader/>
                    <ExtendedHitboxHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <GrabData hitbox={hitbox}></GrabData>
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

export default ExtendedGrabView;

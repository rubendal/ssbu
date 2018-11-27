import React, { Component } from 'react';
import GrabHeader from './shared/GrabHeader';
import GrabData from './shared/GrabData';

class GrabView extends Component {
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
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <GrabData hitbox={hitbox}></GrabData>
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

export default GrabView;

import React, { Component } from 'react';
import SearchCollisionHeader from './shared/SearchCollisionHeader';
import SearchCollisionData from './shared/SearchCollisionData';

class SearchCollisionView extends Component {
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
        <h4>Search Collisions</h4>
        <table className="hitbox-table">
            <thead>
                <tr>
                    <SearchCollisionHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <SearchCollisionData hitbox={hitbox}></SearchCollisionData>
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

export default SearchCollisionView;

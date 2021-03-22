import React, { Component } from 'react';
import Patches from '../assets/diffPatches.json';

class DiffList extends Component{
    constructor(props){
        super(props);

        this.state = {
            versions : Patches.versions
        }
    }

    render(){
        return (
        <div id="version-selection">
        {
          this.state.versions.map((version) =>{
            return (
            <span className="version-span" key={version}>
              <a href={"#/Diff/" + version + "/Character"}>
                    <img className="version-img" src={require(`../assets/img/diffs/${version}.png`).default} alt={version}/>
                    <span className="version-label">{version}</span>
                </a>
            </span>
            )
          })
        }
      </div>
        );
    }
}

export default DiffList;
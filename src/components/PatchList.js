import React, { Component } from 'react';
import Patches from '../assets/patches.json';

class PatchList extends Component{
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
              <a href={"#/Patch/" + version + "/Character"}>
                    <img className="version-img" src={require(`../assets/img/patches/${version}.png`)} alt={version}/>
                    <span className="version-label">{version}</span>
                    {
                        version === "1.1.1" && (
                            <span className="version-1_1_1">Can become ungrabbable due to unpaid intern error</span>
                        )
                    }
                </a>
            </span>
            )
          })
        }
      </div>
        );
    }
}

export default PatchList;
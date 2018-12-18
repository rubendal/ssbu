import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';

class StageList extends Component {
  constructor(props){
    super(props);

    this.state = {
      patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch
    };

    var ref = this;

    axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/stages.json').then(function(res){
      var json = res.data;

      var list = json.sort((x,y) =>{
        return x.name.localeCompare(y.name);
      });

      var normal = list.filter(stage => !stage.isOmega);
      var omega = list.filter(stage => stage.isOmega);

      ref.setState(
        {
          list : normal,
          omegaList : omega
        }
      );
    })
    .catch(function(error){

    });

    
  }


  render() {
    if(this.state.list !== undefined){
    return (
      <div id="stage-selection">
      <h2>Stages</h2>
        {
          this.state.list.map((stage) =>{
            return (
            <span className="stage-span" key={stage.name}>
              <a href={"#/Stage/" + stage.name}>
                    <img className={`stage-list`} src={"/img/stages_icon/" + stage.name
                    .toLowerCase().replace(/\./g,"")
                    + ".png"} alt={stage.name} title={stage.name} />
                </a>
            </span>
            )
          })
        }
        
      </div>
    );
    }else{
      return (
        <ImageMessage/>
      );
    }
  }
}

export default StageList;

/*
<img className={`stage-list`} src={require("../assets/img/stages_icon/" + stage.name
                    .toLowerCase().replace(/\./g,"")
                    + ".png")} alt={stage.name} />


<h2>&Omega; Stages</h2>
        {
          this.state.omegaList.map((stage) =>{
            return (
            <span className="stage-span" key={stage.name}>
              <a href={"#/Stage/Omega " + stage.name}>
                    <img className={`stage-list`} src={require("../assets/img/stages_icon/" + stage.name
                    .toLowerCase().replace(/\./g,"")
                    + ".png")} alt={stage.name} />
                </a>
            </span>
            )
          })
        }
*/
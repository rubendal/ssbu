import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import DiffPatches from '../assets/diffPatches.json';
import CharacterNames from '../assets/characterNames.json';
import CharacterGameNames from '../assets/characterGameNames.json';

class CharacterDiffList extends Component {
  constructor(props){
    super(props);

    this.state = {
      diff : props.match.params.diff === undefined ? DiffPatches.latest : props.match.params.diff
    };

    var ref = this;

    this.path = "#/Diff/Character/";
    if(props.match.params.diff !== undefined){
      this.path = `#/Diff/${this.state.diff}/Character/`;
    }

    axios.get(process.env.PUBLIC_URL + '/data/diffs/' + this.state.diff + '/characterdiffs.json').then(function(res){
      var json = res.data;

      for(var i=0;i<json.length;i++){
          json[i] = CharacterNames[CharacterGameNames.indexOf(json[i])];
      }

      var list = json.sort((x,y) =>{
        return x.localeCompare(y);
      });

      
      ref.setState(
        {
          list : list
        }
      );
    })
    .catch(function(error){

    });

    
  }


  render() {
    if(this.state.list !== undefined){
    return (
      <div id="character-selection">
      <h3 id="version">Version {this.state.diff}</h3>
        {
          this.state.list.map((character) =>{
            return (
            <span className="character-span" key={character}>
              <a href={this.path + character}>
                    <img className={`character-list ${character.toLowerCase().replace(/ /g,"-").replace(/\./g,"").replace("&","and")}`}
                    src={require("../assets/img/characters/" + character.toLowerCase().replace(/\./g,"").replace(/& /g, "").replace("and ","") + ".png")} alt={character} />
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

export default CharacterDiffList;

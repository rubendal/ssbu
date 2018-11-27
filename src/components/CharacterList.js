import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';

class CharacterList extends Component {
  constructor(props){
    super(props);

    this.state = {
      patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch
    };

    var ref = this;

    this.path = "#/Character/";
    if(props.match.params.patch !== undefined){
      this.path = `#/Patch/${this.state.patch}/Character/`;
    }

    axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/characters.json').then(function(res){
      var json = res.data;

      var list = json.sort((x,y) =>{
        return x.Name.localeCompare(y.Name);
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
      <h3 id="version">Version {this.state.patch}</h3>
        {
          this.state.list.map((character) =>{
            return (
            <span className="character-span" key={character.Name}>
              <a href={this.path + character.Name}>
                    <img className={`character-list series-${character.Series} ${character.Name.toLowerCase().replace(/ /g,"-").replace(/\./g,"").replace("&","and")}`}
                    src={require("../assets/img/characters/" + character.Name.toLowerCase().replace(/\./g,"").replace(/& /g, "") + ".png")} alt={character.Name} />
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

export default CharacterList;

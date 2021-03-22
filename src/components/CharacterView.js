import React, { Component } from 'react';
import '../assets/css/characters.css';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';
import ScriptList from './ScriptList';
import ParamList from './ParamList';
import MscView from './MscView';

class CharacterView extends Component {
  constructor(props){
    super(props);

    this.state = {
      patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch,
      display : "scripts"
    };

    var ref = this;

    axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + props.match.params.name.replace(/\.+$/, "") + '/data.json')
    .then(function(res){
        var data = res.data;
        
        ref.setState(prevState => 
          {
            prevState.data = data;
            return prevState;
          }
        );
    })
    .catch(function(error){
      if(error.response){
        var e = "";
        if(error.response.status === 404)
          e = "Invalid character";
        else
          e = "Error";
      }else{
        e = "Error";
      }
      
      ref.setState(
        {
          error: e
        }
      );
    });
    
  }

  changeView(view){
    this.setState(prevState => 
      {
        prevState.display = view;
        return prevState;
      }
    );
  }

  render() {
    if(this.state.data !== undefined){
    return (
      <div id="character-main">

        <h2 id="character-name">{this.state.data.Name}</h2>

        <img id="character-image" src={require("../assets/img/renders/" + this.state.data.Name.toLowerCase().replace(/\./g,"").replace(/& /g, "") + ".png").default} alt={this.state.data.Name} />

        <div id="related">
            <h4>Related sites</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Frame data</td>
                      <td><a href={"http://kuroganehammer.com/Ultimate/" + this.state.data.Name.replace("&","and").replace("Mr. Game", "Game").replace(" (Nana)", "")} target="_blank" rel="noopener noreferrer">Kurogane Hammer</a></td>
                    </tr>
                  </tbody>
                </table>
        </div>
            {
              this.state.display === "scripts" && (
                <ScriptList patch={this.state.patch} data={this.state.data}/>
              )
            }

    </div>
    );
    }else{
      if(this.state.error !== undefined){
        return (
          <div id="character-main">
            <ImageMessage message={this.state.error} image={"error.png"} alt="Error" class="invalid-char-image"></ImageMessage>
          </div>
          );
      }else{
        return (
          <div id="character-main">
            <ImageMessage></ImageMessage>
          </div>
          );
      }
      
    }
  }
}

export default CharacterView;

/*{
              this.state.scripts.map(script => {
                return <ScriptView key={script.Id} script={script}></ScriptView>
              })
            }

            {
              this.state.weapons.length > 0 && (
                <div>
                  <h3>Weapons</h3>
                  {
                    this.state.weapons.map(script => {
                      return <ScriptView key={script.Id} script={script}></ScriptView>
                    })
                  }
                </div>
              )
            } */
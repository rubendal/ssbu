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

    //Get msc files
    axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + props.match.params.name.replace(/\.+$/, "") + '/mscFiles.json')
    .then(function(response){
        ref.setState(prevState => 
          {
            prevState.msc = response.data;
            return prevState;
          }
        );
      })
      .catch(function(e){
        
      })
    
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

        <div className="view-selection">
          <span>
          <a onClick={() => this.changeView("scripts")}>
            Scripts
            </a>
          </span>
          <span>
          <a onClick={() => this.changeView("fighterparams")}>
            Fighter Param
            </a>
          </span>
          {
            this.state.msc !== undefined && (
              <span>
              <a onClick={() => this.changeView("msc")}>
                MSC
                </a>
              </span>
            )
          }
        </div>

        <img id="character-image" src={require("../assets/img/renders/" + this.state.data.Name.toLowerCase().replace(/\./g,"").replace(/& /g, "") + ".png")} alt={this.state.data.Name} />


        <div id="related">
            <h4>Related sites</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Frame data</td>
                      <td><a href={"http://kuroganehammer.com/Smash4/" + this.state.data.Name.replace("&","and").replace("Mr. Game", "Game")} target="_blank" rel="noopener noreferrer">Kurogane Hammer</a></td>
                    </tr>
                    <tr>
                      <td>Hitbox visualizations </td>
                      <td><a href={"https://struz.github.io/smash-move-viewer/#/v1/" + this.state.data.GameName} target="_blank" rel="noopener noreferrer">Smash Move Viewer</a></td>
                    </tr>
                  </tbody>
                </table>
            </div>
            {
              this.state.display === "scripts" && (
                <ScriptList patch={this.state.patch} data={this.state.data}/>
              )
            }
            {
              this.state.display === "fighterparams" && (
                <ParamList patch={this.state.patch} data={this.state.data}/>
              )
            }
            {
              this.state.display === "msc" && (
                <MscView patch={this.state.patch} data={this.state.msc} character={this.state.data.Name}/>
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
import React, { Component } from 'react';
import '../assets/css/characters.css';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import DiffPatches from '../assets/diffPatches.json';
import ScriptDiffList from './ScriptDiffList';
import CharacterNames from '../assets/characterNames.json';
import CharacterGameNames from '../assets/characterGameNames.json';

class CharacterDiffView extends Component {
  constructor(props){
    super(props);

    this.state = {
        characterName: props.match.params.name,
        character : CharacterGameNames[CharacterNames.indexOf(props.match.params.name)],
        diff : props.match.params.diff === undefined ? DiffPatches.latest : props.match.params.diff
    };

    var ref = this;

    axios.get(process.env.PUBLIC_URL + '/data/diffs/' + this.state.diff + '/diffs/' + this.state.character + '/diffs.json')
    .then(function(res){
        var data = res.data;

        var added = [];
        var removed = [];

        var properties = Object.keys(data.Diffs.Diffs);

        for(var i=0;i<properties.length;i++){
          for(var j=0;j<data.Diffs.Diffs[properties[i]].length;j++){
            var diff = data.Diffs.Diffs[properties[i]][j];
            if(diff.Type == 1){
              added.push({dir: properties[i], data: diff});
            }
            else if(diff.Type == 2){
              removed.push({dir: properties[i], data: diff});
            }
          }
        }
        
        ref.setState(prevState => 
          {
            prevState.data = data;
            prevState.added = added;
            prevState.removed = removed;
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
        return prevState;
      }
    );
  }

  render() {
    if(this.state.data !== undefined){
    return (
      <div id="character-main">

        <h2 id="character-name">{this.state.characterName}</h2>
        <h4 className="diff-version-label">{this.state.diff.replace(" - ", " → ")}</h4>

        <img id="character-image" src={require("../assets/img/renders/" + this.state.characterName.toLowerCase().replace(/\./g,"").replace(/& /g, "").replace("and ","") + ".png")} alt={this.state.data.Name} />

        <div id="related">
            <h4>Related sites</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Frame data</td>
                      <td><a href={"http://kuroganehammer.com/Ultimate/" + this.state.characterName.replace("&","and").replace("Mr. Game", "Game")} target="_blank" rel="noopener noreferrer">Kurogane Hammer</a></td>
                    </tr>
                    
                  </tbody>
                </table>
            </div>

            <div className="added-removed-files">
            
            {
              (this.state.removed.length > 0 &&
                <div className="removed-files">
                  <h3>Files removed</h3>
                  <div>
                    <table>
                      <tbody>
                        {
                          this.state.removed.map((file, index) => {
                            return (
                              <tr key={index} className="removed-file">
                                <td>
                                  - {file.dir}/{file.data.Filename.replace(".txt","")}
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              ) 
            }

{
              (this.state.added.length > 0 &&
                <div className={"added-files " + (this.state.removed.length > 0 ? "has-removed" : "")}>
                  <h3>Files added</h3>
                  <div>
                    <table>
                      <tbody>
                        {
                          this.state.added.map((file, index) => {
                            return (
                              <tr key={index} className="added-file">
                                <td>
                                  + {file.dir}/{file.data.Filename.replace(".txt","")}
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              ) 
            }
              
            </div>
            {
              <ScriptDiffList diff={this.state.diff} data={this.state.data}/>
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

export default CharacterDiffView;
import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';

import StageData from '../components/StageData';

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
        return x.localeCompare(y);
      });

      var normal = list;

      ref.setState(
        {
          list : normal,
          stageIndex : -1,
          stage : " "
        }
      );

      
    })
    .catch(function(error){

    });

    
  }

  ChangeStage(event){
    if(event && event.target && event.target.value){
      event.persist();
      var val = event.target.value;
      var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/stage/' + this.state.list[val] + '/data.json').then(function(res){
            var json = res.data;
      
            var data = json;
      
            
            
            ref.setState(prevState => 
              {
                prevState.stage = prevState.list[val];
                prevState.stageData = data;
                prevState.stageIndex = val;
                return prevState;
              }
            );
          })
          .catch(function(error){
            if(error.response){
              var e = "";
              if(error.response.status === 404)
                e = "Invalid stage";
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
  }


  render() {
    if(this.state.list !== undefined){
    return (
      
      <div id="stage-selection">
      <h2 className="stages-header">Stages</h2>
      <div className="script-select">
        <select value={this.state.stageIndex} onChange={(e) => this.ChangeStage(e)}>
        <option value={-1}> </option>
                      {
                          this.state.list.map((stage,index) => {
                            return (
                              <option value={index} key={index}>
                                {stage}
                              </option>
                            );
                          })
                      }
        </select>
        {
          this.state.stageData !== undefined && (
            <StageData stage={this.state.stageData}/>
          )
        }
        </div>
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

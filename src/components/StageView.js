import React, { Component } from 'react';
import '../assets/css/stages.css';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import StageData from './StageData';
import Patches from '../assets/patches.json';

class StageView extends Component{
    constructor(props){
        super(props);
    
        this.state = {
          patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch,
          stageIndex: 0
        };
    
        var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/stage/' + props.match.params.name.replace(/\.+$/, "") + '/data.json').then(function(res){
            var json = res.data;
      
            var data = json;
      
            
            
            ref.setState(prevState => 
              {
                prevState.stage = data[0];
                prevState.data = data;
                prevState.stageIndex = 0;
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

    ChangeLVD(event){
      if(event && event.target && event.target.value){
        event.persist();
        var val = event.target.value;
        this.setState(prevState => 
          {
            prevState.stageIndex = val;
            prevState.stage = prevState.data[val];
            return prevState;
          }
        );
      }
    }

    render(){
        if(this.state.data !== undefined){
            return (
                <div id="stage-main">
                    <h2 id="stage-name">{this.state.stage.stage.includes("Omega ") ? "Omega " + this.state.stage.name : this.state.stage.name}</h2>
                    <div className="stage-img-container">
                        <img className={`stage-view`} src={require("../assets/img/stages/" + this.state.stage.name
                        .toLowerCase().replace(/\./g,"")
                        + ".png")} alt={this.state.stage.name} />
                    </div>
                    {
                      this.state.data.length > 1 && (
                        <div className="lvd-selection">
                          <h3>LVD File</h3>
                          <select value={this.state.stageIndex} onChange={(e) => this.ChangeLVD(e)}>
                            {
                              this.state.data.map((stage,index) => {
                                return (
                                  <option value={index} key={`lvd-${index}`}>
                                    {stage.lvd}
                                  </option>
                                );
                              })
                            }
                          </select>
                      </div>
                      )
                    }
                    
                    <StageData stage={this.state.stage}/>
                </div>
            );
        }else{
            if(this.state.error !== undefined){
              return (
                <div id="stage-main"><ImageMessage message={this.state.error} image={"error.png"} alt="Error" class="invalid-img"></ImageMessage></div>
                );
            }else{
              return (
                <div id="stage-main"><ImageMessage></ImageMessage></div>
                );
            }
            
          }
    }
}

export default StageView;
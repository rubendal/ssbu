import React, { Component } from 'react';
import ScriptView from './ScriptView'
import {ToHex} from '../util/util';
import FileDiffView from './FileDiffView';

class FileDiffList extends Component{
    constructor(props){
        super(props);

        this.state = {
            diff : props.diff,
            data : props.data,
            files: [],
            file : null,
            fileIndex : 0
        };

        var properties = Object.keys(this.state.data.Diffs.Diffs);

        var files = [];
        for(var i=0;i<properties.length;i++){
          for(var j=0;j<this.state.data.Diffs.Diffs[properties[i]].length;j++){
            files.push(this.state.data.Diffs.Diffs[properties[i]][j]);
          }
        }
        
        this.state.files = files;
        this.state.file = files[0];
        this.state.fileIndex = 0;
        
    }

    
    
      ChangeScript(event){
        if(event && event.target && event.target.value){
          event.persist();
          var val = event.target.value;
          this.setState(prevState => 
            {
              prevState.file = prevState.files[val];
              prevState.fileIndex = val;
              return prevState;
            }
          );
        }
      }

      static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
          return {
            diff : props.diff,
            data : props.data
          };
        }
    
        return null;
      }

      render(){
          return (
            <div>            

                <div id="character-data">
                <div className="script-select">
                <h3>File</h3>
                    <select value={this.state.fileIndex} onChange={(e) => this.ChangeScript(e)}>
                    {
                        this.state.files.map((file,index) => {
                          if(file.Type === 0){
                              return (
                                <option value={index} key={`file-${file.Filename}`}>
                                    {file.DiffPath.split("/")[1]}/{file.Filename.replace(".txt","")}
                                </option>
                                );
                            }
                            return null;
                          }
                        )
                    }
                    </select>
                    </div>

                    <FileDiffView diff={this.state.diff} file={this.state.file} />
                </div>
            </div>
          );
      }
}

export default FileDiffList;
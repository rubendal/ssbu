import React, { Component } from 'react';

import axios from 'axios';
import Parser from 'html-react-parser';
import {FormatMscScript} from '../util/util';
import MscVersion from '../assets/tools_version.json';

class MscView extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            patch : props.patch,
            character : props.character,
            data : props.data,
            fileIndex : 0,
            file : props.data[0],
            content : null,
            asText : true
        }
    }

    ChangeScript(event){
        if(event && event.target && event.target.value){
            event.persist();
            var val = event.target.value;
            this.setState(prevState => {
                prevState.fileIndex = val;
                prevState.file = prevState.data[val];
                return prevState;
                }
            );
            if(this.state.asText){
                this.loadScriptAsText();
            }else{
                this.loadScript();
            }
        }
      }

      static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data ||
            props.patch !== state.patch ||
            props.character !== state.character) {
          return {
            patch : props.patch,
            character : props.character,
            data : props.data,
            fileIndex : 0,
            file : props.data[0],
            content : null,
            asText : true
          };
        }
    
        return null;
      }

      loadScript(){
          this.setState(prevState => {
              prevState.content = null;
              return prevState;
          });

          var ref = this;

          axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + this.state.character.replace(/\.+$/, "") + '/' +
           this.state.file.replace("/","_") + '.txt')
           .then(function(res){
                ref.setState(prevState => {
                    prevState.content = res.data;
                    prevState.asText = false;
                    return prevState;
                });
           });
      }

      loadScriptAsText(){
        this.setState(prevState => {
            prevState.content = null;
            return prevState;
        });

        var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/character/' + this.state.character.replace(/\.+$/, "") + '/' +
         this.state.file.replace("/","_") + '.txt')
         .then(function(res){
              ref.setState(prevState => {
                  prevState.content = res.data;
                  prevState.asText = true;
                  return prevState;
              });
         });
    }

    handleChange(){
        if(!this.state.asText){
            this.loadScriptAsText();
        }else{
            this.loadScript();
        }

        this.setState(prevState => {
            prevState.asText = !prevState.asText;
            return prevState;
        });
    }

    componentDidMount(){
        this.loadScriptAsText();
    }

    render(){
        return (
            <div id="character-data">
                <div className="script-select">
                    <h3>MSC File</h3>
                    <select value={this.state.fileIndex} onChange={(e) => this.ChangeScript(e)}>
                        {
                            this.state.data.map((script,index) => {
                                return (
                                    <option value={index} key={`script-${index}`}>
                                        {script}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className="msc-options">
                        <input name="scriptFormat" type="checkbox" checked={!this.state.asText} onChange={() => this.handleChange()}/> 
                        <span>Format script (not recommended for mobile devices)</span>
                    </div>
                    
                </div>

                <div className="msc-script">
                
                    {
                        this.state.content !== null && !this.state.asText && (
                            <div className="msc-container">
                                {Parser(FormatMscScript(this.state.content))}
                            </div>
                        )
                    }

                    {
                        this.state.content !== null && this.state.asText && (
                            <textarea id="scriptbox" value={this.state.content} readOnly>
                                
                            </textarea>
                        )
                    }
                </div>
                <span className="msc-version">
                    <a href={MscVersion.mscdec_link}>
                        mscdec commit {MscVersion.mscdec}
                    </a>
                </span>
                
            </div>
        )
    }
}

export default MscView;
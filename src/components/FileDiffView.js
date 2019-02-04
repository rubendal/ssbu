import React, { Component } from 'react';
import {ToHex, IsScriptEmpty, BuildScript} from '../util/util';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import axios from 'axios';
//Diffs
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'react-gh-like-diff/lib/diff2html.min.css';
import ImageMessage from '../ImageMessage';

class FileDiffView extends Component {
  constructor(props){
    super(props);

    this.state = {
        diff : props.diff,
        file : props.file
    };

    var ref = this;

    axios.get(process.env.PUBLIC_URL + '/data/diffs/' + this.state.diff + "/diff/" + this.state.file.DiffPath).then(function(res){
        var data = res.data;
  
        ref.setState(prevState => 
            {
              prevState.data = data;
              return prevState;
            }
        );
      })
      .catch(function(error){
  
      });
  }


  static getDerivedStateFromProps(props, state) {
    if (props.file !== state.file ||
        props.diff !== state.diff) {
      return {
          file : props.file,
          diff : props.diff
      };
    }

    return null;
  }

  componentDidUpdate(prevState){
    if(prevState.file !== this.state.file || prevState.diff !== this.state.diff){
        var ref = this;
        axios.get(process.env.PUBLIC_URL + '/data/diffs/' + this.state.diff + "/diff/" + this.state.file.DiffPath).then(function(res){
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
                e = "Diff not found";
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
    if(this.state.data !== undefined){
        return (
            <div className="diff-view">
                <ReactGhLikeDiff
                    options={{
                        outputFormat: "side-by-side"
                    }}
                    diffString={this.state.data}
                    />
            
    
            </div>
        );
    }else{
        if(this.state.error !== undefined){
            return (
                <ImageMessage/>
            )
        }
        else{
            return (
                <ImageMessage/>
            )
        }
    }
  }
}

export default FileDiffView;
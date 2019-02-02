import React, { Component } from 'react';
import {ToHex, IsScriptEmpty, BuildScript} from '../util/util';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import axios from 'axios';
//Diffs
import { ReactGhLikeDiff } from 'react-gh-like-diff';
import 'react-gh-like-diff/lib/diff2html.min.css';

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
          diff : props.diff,
          data: undefined
      };
    }

    return null;
  }

  componentDidUpdate(prevState){
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
        return(
            <div>
                Oops... Something went wrong
            </div>
        )
    }
  }
}

export default FileDiffView;
import React, { Component } from 'react';
import '../assets/css/characters.css';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';
import ItemScriptList from './ItemScriptList';

class ItemView extends Component {
  constructor(props){
    super(props);

    this.state = {
      patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch
    };

    var ref = this;

    if(Patches.versions.indexOf(this.state.patch) <= Patches.versions.indexOf("7.0.0"))
    {
        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/items.json')
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
            e = "Not able to get data";
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
        
    }else{
        ref.setState(
            {
            error: "Item data not available on this patch, only available after patch 7.0.0"
            }
        );
    }
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

        <h2 id="character-name">Items</h2>

        <ItemScriptList patch={this.state.patch} data={this.state.data}/>

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

export default ItemView;
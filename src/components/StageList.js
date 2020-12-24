import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';

class StageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patch: props.match.params.patch === undefined ? Patches.latest : props.match.params.patch
    };

    var ref = this;

    this.path = "#/Stage/";
    if (props.match.params.patch !== undefined) {
      this.path = `#/Patch/${this.state.patch}/Stage/`;
    }

    var url = process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/stages.json';
    if(this.state.patch === "9.0.0") //Github pages was returning error 404 for some reason with stages.json
      url = process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/stage.json';

    axios.get(url).then(function (res) {
      var json = res.data;

      var list = json.sort((x, y) => {
        return x.name.localeCompare(y.name);
      });

      var normal = list.filter(stage => !stage.isOmega);
      var omega = list.filter(stage => stage.isOmega);

      ref.setState(
        {
          list: normal,
          omegaList: omega
        }
      );
    })
      .catch(function (error) {

      });


  }


  render() {
    if (this.state.list !== undefined) {
      return (
        <div id="stage-selection">
          <h2>Stages</h2>
          {
            this.state.list.map((stage, index) => {
              return (
                <span className="stage-span" key={stage.name + "_" + index}>
                  <a href={this.path + stage.name}>
                    <img className={`stage-list`} src={process.env.PUBLIC_URL + "/img/stages_icon/" + stage.name
                      .toLowerCase().replace(/\./g, "").replace(/\,/g, "").replace("northern cave", "northern_cave")
                      + ".png"} alt={stage.name} title={stage.name} />
                    {
                      stage.name === "BattleField (Common)" && (
                        <span className="imglabel">Common</span>
                      )
                    }
                    {
                      stage.name === "Final Destination (Large)" && (
                        <span className="imglabel">5+ players</span>
                      )
                    }
                    {
                      stage.name !== "Final Destination (Large)" && stage.name !== "BattleField (Common)" && (
                        <span className="imgstagelabel">{stage.name}</span>
                      )
                    }
                  </a>
                </span>
              )
            })
          }

        </div>
      );
    } else {
      return (
        <ImageMessage />
      );
    }
  }
}

export default StageList;

/*
<img className={`stage-list`} src={require("../assets/img/stages_icon/" + stage.name
                    .toLowerCase().replace(/\./g,"")
                    + ".png")} alt={stage.name} />


<h2>&Omega; Stages</h2>
        {
          this.state.omegaList.map((stage) =>{
            return (
            <span className="stage-span" key={stage.name}>
              <a href={"#/Stage/Omega " + stage.name}>
                    <img className={`stage-list`} src={require("../assets/img/stages_icon/" + stage.name
                    .toLowerCase().replace(/\./g,"")
                    + ".png")} alt={stage.name} />
                </a>
            </span>
            )
          })
        }
*/
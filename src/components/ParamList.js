import React, { Component } from 'react';
import ParamView from './ParamView';
import axios from 'axios';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

class ParamList extends Component{
    constructor(props){
        super(props);

        this.state = {
            patch : props.patch,
            data : props.data,
            params : props.data.FighterParams,
            tags : null
        };

        this.state.params.sort((x,y)=>{
            return x.Name - y.Name;
        });

        var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/params.json')
        .then(function(res){
            ref.setState(prevState => 
                {
                    prevState.tags = res.data;
                    return prevState;
                }
              );

        });
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.data) {
            props.data.FighterParams.sort((x,y)=>{
                return x.Name - y.Name;
            });
          return {
            patch : props.patch,
            data : props.data,
            params : props.data.FighterParams,
            tags : state.tags
          };
        }
    
        return null;
      }

    render(){
        return (
            <div>
            <div id="character-data" className="param-list">
            <table>
                <thead>
                    <tr>
                        <td>
                            Name
                        </td>
                        <td>
                            Type
                        </td>
                        <td>
                            Value
                        </td>
                        <td>
                        <OverlayTrigger placement="top" overlay={
                        <Tooltip id={"DescriptionTooltip"}>
                            Descriptions from <a href="https://docs.google.com/spreadsheets/d/1FgOsGYfTD4nQo4jFGJ22nz5baU1xihT5lreNinY5nNQ/edit?pref=2&pli=1#gid=706249581">Meshima's param spreadsheet</a>
                        </Tooltip>}>
                            <span className="dot-underline">Description</span>
                        </OverlayTrigger>
                        </td>
                    </tr>
                </thead>
                <tbody>
                {
                    this.state.params.map((param)=>{
                        return (
                            <ParamView key={param.Id} param={param} tag={this.state.tags !== null ? this.state.tags[param.Name-1] : ""}/>
                        )
                    })
                }
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

export default ParamList;
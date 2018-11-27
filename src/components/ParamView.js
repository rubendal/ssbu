import React, { Component } from 'react';

//Param descriptions taken from Meshima's spreadsheet https://docs.google.com/spreadsheets/d/1FgOsGYfTD4nQo4jFGJ22nz5baU1xihT5lreNinY5nNQ/edit?pref=2&pli=1#gid=706249581

class ParamView extends Component{
    constructor(props){
        super(props);

        this.state = {
            param : props.param,
            tag : props.tag
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.param !== state.param || props.tag !== state.tag) {
          return {
            param : props.param,
            tag : props.tag
          };
        }
    
        return null;
      }

    render(){
        return (
            <tr>
                <td>
                    {this.state.param.Name}
                </td>
                <td>
                    {this.state.param.Type}
                </td>
                <td>
                    {this.state.param.Value}
                </td>
                <td>
                    {this.state.tag}
                </td>
            </tr>
        )
    }
}

export default ParamView;
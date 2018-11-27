import React, { Component } from 'react';

class BooleanView extends Component {
  constructor(props){
    super(props);

    this.value = props.value;

    
  }


  render() {
    return (
        <td className="td-center">
            <input type="checkbox" defaultChecked={this.value} disabled/>
        </td>
    );
    }
}

export default BooleanView;

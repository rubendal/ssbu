import React, { Component } from 'react';

class GrabHeader extends Component {
  render() {
    return (
      <React.Fragment>
            <td>Grabbox Active</td>
            <td>Set Type</td>
            <td>ID</td>
            <td>Bone</td>
            <td>Size</td>
            <td>X</td>
            <td>Y</td>
            <td>Z</td>
            <td>Hits Grounded</td>
            <td>Hits Aerial</td>
      </React.Fragment>
    );
  }
}

export default GrabHeader;

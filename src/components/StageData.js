import React, { Component } from 'react';
import Visualizer from './Visualizer';

class StageData extends Component{
    constructor(props){
        super(props);

        this.state = {
            stage : props.stage
        };
    }

    static getDerivedStateFromProps(props, state) {
		if (props.stage !== state.stage) {
		  return {
			  stage : props.stage
		  };
		}

		return null;
	  }

    render(){
        return (
            <React.Fragment>
                <div className="visualizer-container">
                    <div>
                        <h3>LVD file visualization</h3>
                        <Visualizer stage={this.state.stage}/>
                    </div>
                </div>
                <div id="stage-data">
                    <h3>Camera bounds</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Left
                                </td>
                                <td>
                                    Right
                                </td>
                                <td>
                                    Top
                                </td>
                                <td>
                                    Bottom
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {
                                this.state.stage.camera.map((v, index) =>{
                                    return (
                                        <td key={`camera-${index}`}>
                                            {v}
                                        </td>
                                    )
                                })
                            }
                            </tr>
                        </tbody>
                    </table>

                    <h3>Blast zone</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Left
                                </td>
                                <td>
                                    Right
                                </td>
                                <td>
                                    Top
                                </td>
                                <td>
                                    Bottom
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            {
                                this.state.stage.blast_zones.map((v, index) =>{
                                    return (
                                        <td key={`blastzone-${index}`}>
                                            {v}
                                        </td>
                                    )
                                })
                            }
                            </tr>
                        </tbody>
                    </table>

                    <h3>Initial spawns</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    ID
                                </td>
                                <td>
                                    X
                                </td>
                                <td>
                                    Y
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stage.spawns.map((v, index) =>{
                                return (
                                    <tr key={`spawn-${index}`}>
                                        <td>
                                            {index}
                                        </td>
                                        <td>
                                            {v[0]}
                                        </td>
                                        <td>
                                            {v[1]}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>

                    <h3>Respawns</h3>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    ID
                                </td>
                                <td>
                                    X
                                </td>
                                <td>
                                    Y
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.stage.respawns.map((v, index) =>{
                                return (
                                    <tr key={`respawn-${index}`}>
                                        <td>
                                            {index}
                                        </td>
                                        <td>
                                            {v[0]}
                                        </td>
                                        <td>
                                            {v[1]}
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default StageData;
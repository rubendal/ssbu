import React, { Component } from 'react';
import {ParseHurtboxState, ToHexWithoutPadding} from '../util/util';

class HurtboxStateView extends Component{
    constructor(props){
        super(props);

        props.list.sort((x,y) => {
            return x.Frame - y.Frame;
        })

        this.state = {
            list : props.list
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.list !== state.list) {
            props.list.sort((x,y) => {
                return x.Frame - y.Frame;
            })
          return {
              list : props.list
          };
        }
    
        return null;
      }

    render(){
        return (
            <div>
                <h4>Hurtboxes States</h4>
                <table className="hurtbox-state-table">
                    <thead>
                        <tr>
                            <td>
                                Frame
                            </td>
                            <td>
                                Hurtbox Bone
                            </td>
                            <td>
                                State
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.list.map((state, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {state.Frame + 1}
                                        </td>
                                        <td>
                                            {state.Bone === null ? "All" : ToHexWithoutPadding(state.Bone)}
                                        </td>
                                        <td>
                                            {ParseHurtboxState(state.State)}
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HurtboxStateView;
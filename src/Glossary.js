import React, { Component } from 'react';
import './assets/css/glossary.css';
import Parser from 'html-react-parser';

import Data from './assets/glossary';

class Term extends Component{
    constructor(props){
        super(props);

        this.term = props.term;
        this.def = props.def;
    }

    render(){
        return (
            <tr>
                <td className="term">
                    {this.term}
                </td>
                <td className="definition">
                    {Parser(this.def)}
                </td>
            </tr>
        );
    }
}

class Glossary extends Component{
    render(){
        return (
            <div id="main" className="glossary">
                <table>
                    <thead>
                        <tr>
                            <td className="term">
                                Term
                            </td>
                            <td className="definition">
                                Definition
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Data.map(v =>{
                            return(
                                <Term key={v.t} term={v.t} def={v.d}/>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Glossary;
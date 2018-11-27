import React, { Component } from 'react';
import Parser from 'html-react-parser';
import {FormatSearchScript} from '../util/util';

function SplitPages(matches){
    var a = 5;
    var list = [];
    var temp = [];

    matches.sort((x,y) => {
        if(x.article === y.article)
            return x.subaction - y.subaction;
        if(x.article === "body")
            return -1;
        if(y.article === "body")
            return 1;
        return x.article.localeCompare(y.article);
    })

    for(var i=0;i<matches.length;i++){
        temp.push(matches[i]);
        if(i!== 0 && i % a === a - 1){
            list.push(temp);
            temp = [];
        }
    }
    if(temp.length > 0)
        list.push(temp);

    return list;
}

class ScriptSearchResult extends Component{
    constructor(props){
        super(props);

        this.state = {
            regex : props.data.regex,
            scriptFile : props.scriptFile,
            character : props.data.character,
            matches : props.data.matches,
            no : props.data.no,
            pages : SplitPages(props.data.matches),
            page : 0
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data.regex !== state.regex ||
            props.scriptFile !== state.scriptFile ||
            props.data.character !== state.character ||
            props.data.matches !== state.matches ||
            props.data.no !== state.no) {
          return {
            regex : props.data.regex,
            scriptFile : props.scriptFile,
            character : props.data.character,
            matches : props.data.matches,
            no : props.data.no,
            pages : SplitPages(props.data.matches),
            page : 0
          };
        }
    
        return null;
      }

      changePage(val){
        var pages = this.state.pages.length;
        var page = this.state.page + val;
        if(page < 0){
            page = 0;
        }
        if(page > pages){
            page = pages - 1;
        }
        this.setState(prevState => {
            prevState.page = page;
            return prevState;
        });
      }

    render(){
        return (
            <div className="character-result-table">
                <h3>{this.state.character}</h3>
                <span>Matches: {this.state.no}</span>
                <table className="search-results">
                    <thead>
                        <tr>
                            <td>
                                Script Name
                            </td>
                            {
                                this.state.scriptFile === "all" && (
                                    <td>
                                        Script File
                                    </td>
                                )
                            }
                            <td>
                                Matches
                            </td>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {
                            this.state.pages[this.state.page].map((script, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {script.script}
                                        </td>
                                        {
                                            this.state.scriptFile === "all" && (
                                                <td>
                                                    {script.file}
                                                </td>
                                            )
                                        }
                                        <td>
                                            {
                                                script.matches.map((line, index) => {
                                                    return (
                                                        <div key={`${script.animname}-${index}`}>
                                                            {Parser(FormatSearchScript(line, this.state.regex))}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

                {
                    this.state.pages.length > 1 && (
                        <div className="page-buttons">
                            {
                                this.state.page !== 0 && (
                                    <button name="prevPage" className="page-button" onClick={() => this.changePage(-1)}>&lt;</button>
                                )
                            }
                            <span className="page">{this.state.page + 1}</span>
                            {
                                this.state.page !== this.state.pages.length - 1 && (
                                    <button name="nextPage" className="page-button" onClick={() => this.changePage(1)}>&gt;</button>
                                )
                            }
                        </div>
                    )
                }
                
            </div>
        );
    }
}

export default ScriptSearchResult;
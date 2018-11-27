import React, { Component } from 'react';
import axios from 'axios';
import ImageMessage from '../ImageMessage';
import Patches from '../assets/patches.json';
import '../assets/css/scriptsearch.css';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

import ScriptSearchResult from './ScriptSearchResult';

function CheckScript(regex, script){

    if(script === null){
        return {
            hasMatches : false
        };
    }

    var data = null;

    var lines = [];

    var hasMatches = false;

    var m;

    do{
        m = regex.exec(script);

        if(m !== null){
            hasMatches = true;
    
            var start = 0;
            var end = 0;
    
            //Get line beginning
    
            for (var x = m.index; x >= 0; x--) {
                if (script.charAt(x - 1) === '\n') {
                    start = x;
                    break;
                }
            }
    
            //Get line end
    
            for (x = m.index + m[m.length - 1].length; x < script.length; x++) {
                if (script.charAt(x - 1) === '\n') {
                    end = x-2; //\r\n
                    break;
                }
            }

            lines.push(script.substr(start, end-start));
        }
    }while(m);

    if (hasMatches) {
        data = lines;
    }

    return {
        hasMatches : hasMatches,
        data : data
    };
}

class ScriptSearch extends Component{
    constructor(props){
        super(props);

        this.state = {
            patch : props.match.params.patch === undefined ? Patches.latest : props.match.params.patch,
            search : "",
            scriptFile : "game",
            data : null,
            results : null,
            searchError : null,
            loading : false,
            showHelp : false
        };

        var ref = this;

        axios.get(process.env.PUBLIC_URL + '/data/patch/' + this.state.patch + '/search.json')
        .then(function(res){
            ref.setState(prevState => {
                prevState.data = res.data;
                prevState.searchError = null;
                return prevState;
            });
        })
        .catch(function(error){
            ref.setState(prevState => ({
                error : "Error"
            }));
        });
    }

    updateInput(event){
        if(event && event.target && event.target.value !== null){
            event.persist();
            this.setState(prevState => {
                prevState.search = event.target.value;
                prevState.results = null;
                return prevState;
            });
        }
    }

    updateSelect(event){
        if(event && event.target && event.target.value !== null){
            event.persist();
            this.setState(prevState => {
                prevState.scriptFile = event.target.value;
                prevState.results = null;
                return prevState;
            });
        }
    }

    search(){

        this.setState(prevState => {
            prevState.results = null;
            prevState.loading = true;
            return prevState;
        });

        var ref = this;

        new Promise(function(resolve, reject){
            try{
                
                if(ref.state.search === ""){
                    reject("Empty search regex");
                    return;
                }

                var regex = new RegExp(ref.state.search, "g");
    
                var results = [];
    
                for(var c = 0; c < ref.state.data.length; c++){
                    //Character
                    var characterResults = {
                        regex : new RegExp(`(${ref.state.search})`, "g"),
                        character : ref.state.data[c].Character,
                        matches: [],
                        no : 0
                    };
                    for(var i = 0;i < ref.state.data[c].Scripts.length; i++){
                        var temp;
                        var animname = "";
                        if(ref.state.scriptFile === "game" || ref.state.scriptFile === "all"){
                            temp = CheckScript(regex, ref.state.data[c].Scripts[i].Game);
                            if(temp.hasMatches){
                                animname = ref.state.data[c].Scripts[i].AnimationName;
                                if(ref.state.data[c].Scripts[i].Article !== "body")
                                    animname = ref.state.data[c].Scripts[i].Article + "/" + animname;
                                characterResults.matches.push({
                                    script : animname,
                                    file : "Game",
                                    matches : temp.data,
                                    subaction : ref.state.data[c].Scripts[i].SubactionIndex,
                                    article : ref.state.data[c].Scripts[i].Article
                                });
                                characterResults.no += temp.data.length;
                            }
                        }
                        if(ref.state.scriptFile === "expression" || ref.state.scriptFile === "all"){
                            temp = CheckScript(regex, ref.state.data[c].Scripts[i].Expression);
                            if(temp.hasMatches){
                                animname = ref.state.data[c].Scripts[i].AnimationName;
                                if(ref.state.data[c].Scripts[i].Article !== "body")
                                    animname = ref.state.data[c].Scripts[i].Article + "/" + animname;
                                characterResults.matches.push({
                                    script : animname,
                                    file : "Expression",
                                    matches : temp.data,
                                    subaction : ref.state.data[c].Scripts[i].SubactionIndex,
                                    article : ref.state.data[c].Scripts[i].Article
                                });
                                characterResults.no += temp.data.length;
                            }
                        }
    
                        if(ref.state.scriptFile === "effect" || ref.state.scriptFile === "all"){
                            temp = CheckScript(regex, ref.state.data[c].Scripts[i].Effect);
                            if(temp.hasMatches){
                                animname = ref.state.data[c].Scripts[i].AnimationName;
                                if(ref.state.data[c].Scripts[i].Article !== "body")
                                    animname = ref.state.data[c].Scripts[i].Article + "/" + animname;
                                characterResults.matches.push({
                                    script : animname,
                                    file : "Effect",
                                    matches : temp.data,
                                    subaction : ref.state.data[c].Scripts[i].SubactionIndex,
                                    article : ref.state.data[c].Scripts[i].Article
                                });
                                characterResults.no += temp.data.length;
                            }
                        }
    
                        if(ref.state.scriptFile === "sound" || ref.state.scriptFile === "all"){
                            temp = CheckScript(regex, ref.state.data[c].Scripts[i].Sound);
                            if(temp.hasMatches){
                                animname = ref.state.data[c].Scripts[i].AnimationName;
                                if(ref.state.data[c].Scripts[i].Article !== "body")
                                    animname = ref.state.data[c].Scripts[i].Article + "/" + animname;
                                characterResults.matches.push({
                                    script : animname,
                                    file : "Sound",
                                    matches : temp.data,
                                    subaction : ref.state.data[c].Scripts[i].SubactionIndex,
                                    article : ref.state.data[c].Scripts[i].Article
                                });
                                characterResults.no += temp.data.length;
                            }
                        }
    
                    }
                    if(characterResults.matches.length > 0){
                        results.push(characterResults);
                    }
                }

                resolve(results);
            }
            catch(e){
                reject("Invalid regex");
            }
        })
        .then(function(res){
            ref.setState(prevState => {
                prevState.results = res;
                prevState.searchError = null;
                prevState.loading = false;
                return prevState;
            });
        },
        function(error){
            ref.setState(prevState => {
                prevState.results = null;
                prevState.searchError = error;
                prevState.loading = false;
                return prevState;
            });
        });
    }

    toggleHelp(){
        this.setState(prevState => {
            prevState.showHelp = !prevState.showHelp;
            return prevState;
        });
    }

    render(){
        if(this.state.data !== null){
            return (
                <div id="search-main">
                    <div className={"script-search " + (this.state.showHelp ? "split" : "")}>
                        <span>
                            <input type="text" name="regex" className="search" value={this.state.search} onChange={(e) => this.updateInput(e)} placeholder="Regex"/>
                            
                            <div className="search-file-container">
                                <select className="search-file" value={this.state.scriptFile} onChange={(e) => this.updateSelect(e)}>
                                    <option value="all">All</option>
                                    <option defaultValue value="game">Game</option>
                                    <option value="expression">Expression</option>
                                    <option value="effect">Effect</option>
                                    <option value="sound">Sound</option>
                                </select>
                            </div>

                            <div className="search-buttons-container">
                                    <OverlayTrigger placement="bottom" overlay={
                                        <Tooltip id={"DescriptionTooltip"}>
                                            Search
                                        </Tooltip>}>
                                        <button className="search-button" name="search" onClick={() => this.search()}>
                                            <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">&#128269;</span>
                                        </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="bottom" overlay={
                                        <Tooltip id={"DescriptionTooltip"}>
                                            {this.state.showHelp ? "Hide" : "Show"} help
                                        </Tooltip>}>
                                        <button className="search-button" name="help" onClick={() => this.toggleHelp()}>
                                            ?
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </span>
                            
                            <div className={"search-help " + (this.state.showHelp ? "show" : "")}>
                        <div className="help">
                            <h3>Help</h3>
                            This is a brief explanation on how to use the script search tool
                            <h4>What's a regex?</h4>
                            Regular expression, it's a search pattern that will be used on a text (in this case animcmd scripts) allowing more options on 
                            searching stuff
                            <br/>
                            You can still look for literal stuff like "Hitbox" and "SDI=0" but be careful of special characters like parenthesis (for those 
                            add a <span className="bold focus">\</span> before them)
                            <br/>
                            <h5>Examples</h5>
                            <ul>
                                <li>
                                    <span className="focus example">Hitlag=[1-3],</span>
                                    <br/>
                                    Displays hitboxes and throws with Hitlag multipliers equal to 1 and 3 (ignores everything with decimals with the comma), 
                                    <span className="focus">[1-3]</span> means that space will be taken by a value from digit set 1 to 3 so 1/2/3 are the possible values
                                </li>
                                <li>
                                    <span className="focus example">Hitlag=[1-2]\.[0-9]+,</span>
                                    <br/>
                                    Displays hitboxes and throws with Hitlag multipliers equal values between 1 and 2, notice the 
                                    <span className="bold focus">\</span> set before the dot, a dot in regex means any character but by escaping it 
                                    the tool will look for dot specifically, <span className="focus">[0-9]+</span> means one or more digits from 0-9 (all digits)
                                </li>
                                <li>
                                    <span className="focus example">Damage=([1-9](\.?)[0-9]*|0\.[0-9]+),.*Trip=(1|0\.[0-9]+)</span>
                                    <br/>
                                    Displays hitboxes that have damage not equal 0 and trip multiplier not equal 0, <span className="focus">(\.?)</span> 
                                    means there could be a dot or not (but only one), <span className="focus">[0-9]*</span> means there could be zero or multiple 
                                    instances of digits from 0 to 9, <span className="focus">.*</span> is used to skip all text between the Damage and Trip,
                                    finally both <span className="focus">([1-9](\.?)[0-9]*|0\.[0-9]+)</span> and <span className="focus">(1|0\.[0-9]+)</span> 
                                    are used to search for both patterns separated by the <span className="bold focus">|</span> character
                                </li>
                            </ul>
                            <br/>
                            If you are interested on writting more complex regular expressions you 
                            should <a href="https://www.regular-expressions.info/quickstart.html">read this</a>
                        </div>
                    </div>
                    {
                        !this.state.loading && this.state.results !== null && this.state.results !== [] && (
                            <div className={(this.state.showHelp ? "split" : "")}>
                                <h4>Results</h4>
                                
                                {
                                    this.state.results.map((data, index) => {
                                        return (
                                            <ScriptSearchResult key={index} scriptFile={this.state.scriptFile} data={data}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    {
                        !this.state.loading && this.state.searchError !== null && (
                            <div>
                                <ImageMessage message={this.state.searchError} image={"error.png"} alt="Error" class="invalid-regex-img"></ImageMessage>
                            </div>
                        )
                    }
                    {
                        this.state.loading && (
                            <div>
                                <ImageMessage message={"Processing"} image={"darkpit-wait2.gif"} alt="Processing"></ImageMessage>
                            </div>
                        )
                    }
                    </div>

                    
                </div>
            )
        }
        else{
            if(this.state.error !== undefined){
                return (
                    <div id="character-main">
                        <ImageMessage message={this.state.error} image={"error.png"} alt="Error" class="invalid-char-image"></ImageMessage>
                    </div>
                )
            }
            else{
                return (
                    <div id="character-main">
                        <ImageMessage/>
                    </div>
                )
            }
        }
    }
}

export default ScriptSearch;
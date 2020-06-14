import React, { Component } from 'react';
import Characters from './assets/img/characters.png';
import Stages from './assets/img/stages.png';
import Patches from './assets/img/patches.png';
import Diffs from './assets/img/diffs.png';
import ScriptSearch from './assets/img/scriptsearch.png';
import Glossary from './assets/img/glossary.png';
import Items from './assets/img/items.png';
import Resources from './assets/img/resources.png';
import About from './assets/img/about.png';
import DiffList from './components/DiffList';

class Home extends Component {
    render() {
      return (
        <div id="main" className="home">

          <span >
              <a href="#/Character">
                <img src={Characters} alt="Characters"/>
              </a>
          </span>

          <span>
            <a href="#/Stage">
              <img src={Stages} alt="Stages"/>
            </a>
          </span>

          <span>
            <a href="#/Items">
              <img src={Items} alt="Items"/>
            </a>
          </span>

          <span>
            <a href="#/Patch">
              <img src={Patches} alt="Patches"/>
            </a>
          </span>

          <span>
            <a href="#/Diff">
              <img src={Diffs} alt="Diffs"/>
            </a>
          </span>

          <span>
            <a href="#/ScriptSearch">
              <img src={ScriptSearch} alt="ScriptSearch"/>
            </a>
          </span>

          <span>
            <a href="#/Glossary">
              <img src={Glossary} alt="Glossary"/>
            </a>
          </span>
        </div>
      );
    }
  }
  
  export default Home;
  
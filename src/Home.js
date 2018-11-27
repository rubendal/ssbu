import React, { Component } from 'react';
import Characters from './assets/img/characters.png';
import Stages from './assets/img/stages.png';
import Patches from './assets/img/patches.png';
import ScriptSearch from './assets/img/scriptsearch.png';
import Glossary from './assets/img/glossary.png';
import Resources from './assets/img/resources.png';
import About from './assets/img/about.png';

class Home extends Component {
    render() {
      return (
        <div id="main" className="home">

          <span>
            <a href="#/Stage">
              <img src={Stages} alt="Stages"/>
            </a>
          </span>
        </div>
      );
    }
  }
  
  export default Home;
  
import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Header from './Header';
import NavigationHeader from './NavigationHeader';
import Home from './Home';
import About from './About';
import Glossary from './Glossary';
import Resources from './Resources';
import CharacterList from './components/CharacterList';
import CharacterView from './components/CharacterView';
import StageList from './components/StageList';
import StageView from './components/StageView';
import PatchList from './components/PatchList';

import ScriptSearch from './components/ScriptSearch';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header/>

          <Switch>
            <Route path="/patch/:patch" component={NavigationHeader}/>
            <Route component={NavigationHeader}/>
          </Switch>

          <Switch>            
            <Route exact path="/index.html" component={StageList}/>
            
            <Route exact path="/stage" component={StageList}/>
            <Route exact path="/stage/:name" component={StageView}/>
            
            <Route exact path="/" component={StageList}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;

/*
<Route exact path="/patch/:patch/stage" component={StageList}/>
<Route exact path="/patch/:patch/stage/:name" component={StageView}/>
*/
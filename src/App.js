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

import CharacterDiffList from './components/CharacterDiffList';
import CharacterDiffView from './components/CharacterDiffView';
import DiffList from './components/DiffList';

import ItemView from './components/ItemView';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header/>

          <Switch>
            <Route path="/patch/:patch" component={NavigationHeader}/>
            <Route path="/diff/:diff" component={NavigationHeader}/>
            <Route component={NavigationHeader}/>
          </Switch>

          <Switch>            
            <Route exact path="/index.html" component={Home}/>
            <Route exact path="/glossary" component={Glossary}/>
            
            <Route exact path="/character" component={CharacterList}/>
            <Route exact path="/character/:name" component={CharacterView}/>
            <Route exact path="/stage" component={StageList}/>
            <Route exact path="/stage/:name" component={StageView}/>

            <Route exact path="/patch" component={PatchList}/>
            <Route exact path="/patch/:patch/character" component={CharacterList}/>
            <Route exact path="/patch/:patch/character/:name" component={CharacterView}/>
            <Route exact path="/patch/:patch/stage" component={StageList}/>
            <Route exact path="/patch/:patch/stage/:name" component={StageView}/>

            <Route exact path="/diff/character" component={CharacterDiffList}/>
            <Route exact path="/diff/character/:name" component={CharacterDiffView}/>
            
            <Route exact path="/diff/:diff/character" component={CharacterDiffList}/>
            <Route exact path="/diff/:diff/character/:name" component={CharacterDiffView}/>

            <Route path="/diff" component={DiffList}/>

            <Route exact path="/scriptsearch" component={ScriptSearch}/>
            <Route exact path="/patch/:patch/scriptsearch" component={ScriptSearch}/>

            <Route exact path="/items" component={ItemView}/>
            
            <Route exact path="/" component={Home}/>
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
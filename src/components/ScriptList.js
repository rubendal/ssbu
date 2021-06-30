import React, { Component } from 'react';
import ScriptView from './ScriptView'
import MotionView from './MotionView'
import { ToHex } from '../util/util';

class ScriptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patch: props.patch,
      displayHitboxesOnly: false,
      data: props.data,
      script: null,
      scriptIndex: 0,
      article: '',
      allArticles: [],
      allScripts: [],
      throws: null
    };


    this.state.allArticles = this.state.data.Articles;
    this.state.article = this.state.data.Articles[0];

    var scripts = this.state.data.Scripts[this.state.article];

    this.state.script = scripts[0];
    this.state.scriptIndex = 0;
    this.state.allScripts = scripts;

  }

  handleDisplayChange() {
    if (this.state.data !== undefined) {
      var allArticles = this.state.data.Articles;
      var article = this.state.data.Articles[0];

      var scripts = this.state.data.Scripts[this.state.article];


      this.setState(prevState => {
        prevState.allArticles = allArticles;
        prevState.article = article;
        prevState.script = scripts[0];
        prevState.scriptIndex = 0;
        prevState.allScripts = scripts;
        prevState.displayHitboxesOnly = !prevState.displayHitboxesOnly;
        return prevState;
      }
      );
    }
  }

  ChangeScript(event) {
    if (event && event.target && event.target.value) {
      event.persist();
      var val = event.target.value;
      this.setState(prevState => {
        prevState.script = prevState.allScripts[val];
        prevState.scriptIndex = val;
        return prevState;
      }
      );
    }
  }

  ChangeArticle(event) {
    if (event && event.target && event.target.value) {
      event.persist();
      var val = event.target.value;
      var scripts = this.state.data.Scripts[val];
      this.setState(prevState => {
        prevState.article = val;
        prevState.allScripts = scripts;
        prevState.script = scripts[0];
        prevState.scriptIndex = 0;
        return prevState;
      }
      );
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.data !== state.data) {
      return {
        patch: props.patch,
        displayHitboxesOnly: false,
        data: props.data
      };
    }

    return null;
  }

  render() {
    return (
      <div>


        <div id="character-data">
          <div className="script-select">
            <h3>Article</h3>
            <select value={this.state.article} onChange={(e) => this.ChangeArticle(e)}>
              {
                this.state.allArticles.map((article, index) => {
                  return (
                    <option value={article} key={`article-${index}`}>
                      {article}
                    </option>
                  );
                })
              }
            </select>

            <h3>Script</h3>
            <select value={this.state.scriptIndex} onChange={(e) => this.ChangeScript(e)}>
              {
                this.state.allScripts.map((script, index) => {
                  if (!this.state.displayHitboxesOnly || (this.state.displayHitboxesOnly && script.Hitboxes.length > 0)) {
                    return (
                      <option value={index} key={`script-${script.Id}`}>
                        {script.Name}
                      </option>
                    );
                  }
                  return null;
                })
              }
            </select>
          </div>
        {
          this.state.data.Motions && Object.keys(this.state.data.Motions).length > 0  && (
            <MotionView data={this.state.data.Motions} article={this.state.article} script={this.state.script.Name} />
          )
        }
          <ScriptView script={this.state.script} WeightDependentThrows={[]} />
        </div>
      </div>
    );
  }
}

export default ScriptList;

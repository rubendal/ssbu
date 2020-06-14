import React, { Component } from 'react';
import ScriptView from './ScriptView'
import { ToHex } from '../util/util';

class ItemScriptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patch: props.patch,
      data: props.data,
      script: null,
      scriptIndex: 0,
      type: '',
      item: '',
      allTypes: [],
      allItems: [],
      allScripts: [],
      throws: null
    };

    this.state.allTypes = this.state.data.Types;
    this.state.type = this.state.data.Types[1];

    this.state.allItems = this.state.data.Data[this.state.type].ItemNames;
    this.state.item = this.state.data.Data[this.state.type].ItemNames[0];

    //this.state.allScripts = this.state.data.Data[this.state.type].Items[this.state.item].ScriptNames;
    //this.state.script = this.state.data.Data[this.state.type].Items[this.state.item].ScriptNames[0];

    var scripts = this.state.data.Data[this.state.type].Items[this.state.item].Scripts;

    this.state.script = scripts[0];
    this.state.scriptIndex = 0;
    this.state.allScripts = scripts;

    

  }

  handleDisplayChange() {
    if (this.state.data !== undefined) {
      var allTypes = this.state.data.Types;
      var type = this.state.data.Types[0];

      var allItems = this.state.data.Data[type].ItemNames;
      var item = this.state.data.Data[type].ItemNames[0];

      var scripts = this.state.data.Data[this.state.type].Items[this.state.item].Scripts;


      this.setState(prevState => {
        prevState.allTypes = allTypes;
        prevState.type = type;
        prevState.allItems = allItems;
        prevState.item = item;
        prevState.script = scripts[0];
        prevState.scriptIndex = 0;
        prevState.allScripts = scripts;
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

  ChangeType(event) {
    if (event && event.target && event.target.value) {
      event.persist();
      var val = event.target.value;

      var items = this.state.data.Data[val].ItemNames;
      var item = items[0];

      var scripts = this.state.data.Data[val].Items[item].Scripts;
      this.setState(prevState => {
        prevState.type = val;
        prevState.allItems = items;
        prevState.item = item;
        prevState.allScripts = scripts;
        prevState.script = scripts[0];
        prevState.scriptIndex = 0;
        return prevState;
      }
      );
    }
  }

  ChangeItem(event) {
    if (event && event.target && event.target.value) {
      event.persist();
      var val = event.target.value;

      var scripts = this.state.data.Data[this.state.type].Items[val].Scripts;
      this.setState(prevState => {
        prevState.item = val;
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
        data: props.data
      };
    }

    return null;
  }

  render() {
    return (
      <div>


        <div id="item-data">
          <div className="script-select">
            <h3>Type</h3>
            <select value={this.state.type} onChange={(e) => this.ChangeType(e)}>
              {
                this.state.allTypes.map((type, index) => {
                  return (
                    <option value={type} key={`type-${index}`}>
                      {type}
                    </option>
                  );
                })
              }
            </select>

            <h3>Item</h3>
            <select value={this.state.item} onChange={(e) => this.ChangeItem(e)}>
              {
                this.state.allItems.map((item, index) => {
                  return (
                    <option value={item} key={`item-${index}`}>
                      {item}
                    </option>
                  );
                })
              }
            </select>

            <h3>Script</h3>
            <select value={this.state.scriptIndex} onChange={(e) => this.ChangeScript(e)}>
              {
                this.state.allScripts.map((script, index) => {
                  return (
                    <option value={index} key={`item-${index}-script-${script.Id}`}>
                      {script.Name}
                    </option>
                  );
                })
              }
            </select>
          </div>

          <ScriptView script={this.state.script} WeightDependentThrows={[]} />
        </div>
      </div>
    );
  }
}

export default ItemScriptList;
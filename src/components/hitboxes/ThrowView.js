import React, { Component } from 'react';
import ThrowHeader from './shared/ThrowHeader';
import ThrowData from './shared/ThrowData';

function IsWeightDependent(name, throws){
  var isWeightDependent = false;

  if(name === "ThrowF"){
    isWeightDependent = throws.Fthrow;
  }
  else if(name === "ThrowB"){
    isWeightDependent = throws.Bthrow;
  }
  else if(name === "ThrowHi"){
    isWeightDependent = throws.Uthrow;
  }
  else if(name === "ThrowLw"){
    isWeightDependent = throws.Dthrow;
  }

  return isWeightDependent;
}

class ThrowView extends Component {
  constructor(props){
    super(props);

    props.hitboxes.sort((x,y) =>{
      var c = x.HitboxActive.Start - y.HitboxActive.Start;

        if (c === 0)
        {
          var c2 = y.HitboxActive.End - x.HitboxActive.End;
          if(c2 === 0)
          {
              return x.HitboxId - y.HitboxId;
          }

          return c2;
        }

          return c;
    });

    this.state = {
        hitboxes : props.hitboxes,
        scriptName : props.scriptName,
        WeightDependentThrows : props.WeightDependentThrows,
        isWeightDependent : IsWeightDependent(props.scriptName, props.WeightDependentThrows)
    };

    
  }

  static getDerivedStateFromProps(props, state) {
    if (props.hitboxes !== state.hitboxes) {
      props.hitboxes.sort((x,y) =>{
        var c = x.HitboxActive.Start - y.HitboxActive.Start;
  
          if (c === 0)
          {
            var c2 = y.HitboxActive.End - x.HitboxActive.End;
            if(c2 === 0)
            {
                return x.HitboxId - y.HitboxId;
            }

            return c2;
          }
  
            return c;
      });
      return {
        hitboxes : props.hitboxes,
        scriptName : props.scriptName,
        WeightDependentThrows : props.WeightDependentThrows,
        isWeightDependent : IsWeightDependent(props.scriptName, props.WeightDependentThrows)
      };
    }

    return null;
  }

  render() {
    return (
      <div>
        <h4>Throws</h4>
        {
          this.state.isWeightDependent && (
            <h5>Weight Dependent Throw</h5>
          )
        }
        <table className="hitbox-table">
            <thead>
            <tr>
                    <ThrowHeader/>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.hitboxes.map(hitbox =>{
                        return (
                            <tr key={hitbox.Id}>
                                <ThrowData hitbox={hitbox}></ThrowData>
                            </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
      </div>
    );
  }
}

export default ThrowView;

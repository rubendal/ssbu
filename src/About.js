import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div id="main" className="about">
        <h3>About</h3>

        Hi! I'm Ruben and I welcome you to the Smash 4 Data Viewer. 
        I'm a Smash researcher and creator of the Smash Calculator 
        for <a href="https://rubendal.github.io/Sm4sh-Calculator/" target="_blank" rel="noopener noreferrer">Smash 4</a> and <a href="https://rubendal.github.io/SSBU-Calculator/" target="_blank" rel="noopener noreferrer">Smash Ultimate</a>.
        <br/>
        <br/>
        This app is meant to be an update to the tools on the <a href="https://rubendal.github.io/SSBU-Calculator/scripts.html" target="_blank" rel="noopener noreferrer">
        Sm4sh Calculator related to game data (Script and param viewers)</a> and also to have some code done for the Smash Ultimate version of these tools, 
        the objective is to allow viewing Ultimate's game data as soon as the tools needed to read game files are available and the data can be interpreted 
        by researchers (like identifying hitbox data) and making it public using a script which parses and stores it into files this app uses to generate 
        views to display the data
        <br/>
        <br/>
        It also attempts to solve some issues the Sm4sh Calculator tools have like having to look params for FAF and intangibility frames using subaction index, 
        better design and making it more easy to use on mobile devices
        <br/>
        <br/>
        <h3>Special Thanks</h3>

        <h4>
            Sammi Husky (<a href="https://twitter.com/SammiHusky">@SammiHusky</a>)
        </h4>

        Smash researcher and developer of <a href="https://github.com/Sammi-Husky/Sm4sh-Tools">SALT</a>, without his tools getting the data through a script and making this site work 
        would be impossible

        <br/><br/>
        <h4>
            Struz (<a href="https://twitter.com/StruzSmash">@StruzSmash</a>)
        </h4>

        Smash researcher, <a href="https://struz.github.io/smash-move-viewer">Smash Move Viewer</a> owner and <a href="https://github.com/jam1garner/Smash-Forge">Smash Forge</a> dev focused on hitbox visualization. Script for hitbox data parsing 
        used for this app was based on his work on Smash Forge Animcmd script processing

        <br/><br/>
        <h4>
            Kurogane Hammer (<a href="https://twitter.com/KuroganeHammer">@KuroganeHammer</a>)
        </h4>

        Smash Frame data man, this site is inspired by his <a href="http://kuroganehammer.com/Smash4">frame data repository</a> which allows people to learn character's frame data and attributes

      </div>
    );
  }
}

export default About;

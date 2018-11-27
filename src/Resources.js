import React, { Component } from 'react';
import KH from './assets/img/resources/kh.png';
import MoveViewer from './assets/img/resources/move_viewer.png';
import Calculator from './assets/img/resources/calculator.png';
import Params from './assets/img/resources/params.png';
import CharParams from './assets/img/resources/fighter_params.png';

class Resources extends Component{
    render(){
        return (
            <div id="main" className="resources">
                <table>
                    <tbody>
                        <tr>
                            <td className="resource-td">
                            <a href="http://kuroganehammer.com/Smash4">
                                <img src={KH} alt="Kurogane Hammer" className="resource-img"/>
                            </a>
                            </td>
                            <td className="resource-td">
                                <h3>Kurogane Hammer</h3>
                                Smash 4 Frame data repository
                                <br/>
                                Owner: <a href="https://twitter.com/KuroganeHammer">@KuroganeHammer</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="resource-td">
                            <a href="https://struz.github.io/smash-move-viewer">
                                <img src={MoveViewer} alt="Smash Move Viewer" className="resource-img"/>
                            </a>
                            </td>
                            <td className="resource-td">
                                <h3>Smash Move Viewer</h3>
                                Character animation and hitbox/hurtbox visualizations
                                <br/>
                                Owner: <a href="https://twitter.com/StruzSmash">@StruzSmash</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="resource-td">
                            <a href="https://rubendal.github.io/Sm4sh-Calculator/">
                                <img src={Calculator} alt="Sm4sh Calculator" className="resource-img"/>
                            </a>
                            </td>
                            <td className="resource-td">
                                <h3>Sm4sh Calculator</h3>
                                Knockback, hitstun, shield advantage, launch visualizations and more
                                <br/>
                                Owner: <a href="https://twitter.com/Ruben_dal">@Ruben_dal</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="resource-td">
                            <a href="https://docs.google.com/spreadsheets/d/1FgOsGYfTD4nQo4jFGJ22nz5baU1xihT5lreNinY5nNQ/edit?pref=2&pli=1#gid=305485435">
                                <img src={Params} alt="Params spreadsheet" className="resource-img"/>
                            </a>
                            </td>
                            <td className="resource-td">
                                <h3>Params spreadsheet</h3>
                                Spreedsheet containing param values and descriptions of multiple game files
                                <br/>
                                Owner: <a href="https://twitter.com/Meshima_">@Meshima_</a>
                            </td>
                        </tr>
                        <tr>
                            <td className="resource-td">
                            <a href="https://docs.google.com/spreadsheets/d/1Hx44PGtG5jcko1t_2VCE2QG_D8xzIv0LDMhCeZHGXjA/edit#gid=1104900741">
                                <img src={CharParams} alt="Fighter params spreadsheet" className="resource-img"/>
                            </a>
                            </td>
                            <td className="resource-td">
                                <h3>Fighter params spreadsheet</h3>
                                Spreedsheet containing param values and descriptions of character files
                                <br/>
                                Owner: <a href="https://twitter.com/Meshima_">@Meshima_</a>
                            </td>
                        </tr>
                    </tbody>
                    {/* Will add more when I make their images */}
                </table>
            </div>
        );
    }
}

export default Resources;
import React, { Component } from 'react';
import Icon from './assets/img/icon.png';
import TIcon from './assets/img/t-icon.png';
import KIcon from './assets/img/kofi.png';

class Header extends Component {
    render() {
        return (
            <div id="header" className="header">
            <div id="header-cont">
                <img id="header-icon" className="header-image invert" src={Icon} alt="Icon" />
                <div id="header-text">
                    <a className="hide-link" href="#/"><h3>Smash Ultimate Data Viewer</h3></a>
                    <br />
                    <span className="description"></span>
                    <br />
                </div>
                <div id="header-right">
                    <span id="links">
                        <span id="github-link">
                            <a href="https://github.com/rubendal" target="_blank" rel="noopener noreferrer" className="hide-link" title="Github">
                                <img id="github-profile" className="header-link-icon2" src="https://avatars.githubusercontent.com/u/10661132?v=3" alt="Github" />
                            </a>
                        </span>
                        <span id="additional-links">
                        <a href="https://ko-fi.com/rubendal" target="_blank" rel="noopener noreferrer" className="hide-link" title="Donate">
                                <img className="header-link-icon" src={KIcon} alt="Ko-fi - Donate" />
                            </a>
                        </span>
                        <span id="additional-links">
                        <a href="https://twitter.com/Ruben_dal" target="_blank" rel="noopener noreferrer" className="hide-link" title="Twitter @Ruben_dal">
                                <img className="header-link-icon" src={TIcon} alt="Twitter @Ruben_dal" />
                            </a>
                        </span>
                    </span>
                </div>
    
            </div>
    
        </div>
        );
      }
}

export default Header;

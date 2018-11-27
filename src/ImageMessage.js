import React, { Component } from 'react';

class ImageMessage extends Component {
  constructor(props){
    super(props);

    this.state = {
      image : props.image === undefined ? "darkpit-wait2.gif" : props.image,
      alt : props.alt === undefined ? "Loading" : props.alt,
      message : props.message !== undefined ? props.message : "Loading...",
      class : props.class === undefined ? "loading-image" : props.class
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.image !== state.image ||
      props.alt !== state.alt ||
      props.message !== state.message ||
      props.class !== state.class) {
      return {
        image : props.image === undefined ? "darkpit-wait2.gif" : props.image,
        alt : props.alt === undefined ? "Loading" : props.alt,
        message : props.message !== undefined ? props.message : "Loading...",
        class : props.class === undefined ? "loading-image" : props.class
      };
    }

    return null;
  }

  render() {
    return (
      <div id="message-container">
        <img className={"message-image " + this.state.class} src={require(`./assets/img/${this.state.image}`)} alt={this.state.alt} />
        <br/>
        <p className="message-label">{this.state.message}</p>
      </div>
    );
  }
}

export default ImageMessage;

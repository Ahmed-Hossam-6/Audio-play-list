import React, { Component } from "react";
import "./Addfrom.css";
class Addform extends Component {
  render() {
    return (
      <div className="form">
        <label htmlFor="track name">Track name:</label>
        <input type="text" id="track name" onChange={this.props.onchangename} />

        <label htmlFor="track length">Track length:</label>
        <input
          type="text"
          id="track length"
          onChange={this.props.onChangelength}
        />

        <label htmlFor="track artist">Track artist:</label>
        <input
          type="text"
          id="track artist"
          onChange={this.props.onChangelist}
        />

        <label htmlFor="track path">Track path:</label>
        <input type="text" id="track path" onChange={this.props.onChangepath} />
        <button onClick={this.props.onClick} className="add">
          ADD
        </button>
        <button onClick={this.props.onClickclose} className="close">
          CLOSE
        </button>
      </div>
    );
  }
}
export default Addform;

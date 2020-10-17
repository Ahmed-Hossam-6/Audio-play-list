import "./App.css";

import React, { Component } from "react";

import Addform from "./component/Addform";
import axios from "axios";

class App extends Component {
  state = {
    trackname: null,
    tracklength: null,
    trackartist: null,
    trackpath: null,
    addflag: false,
    data: null,
    currenturl: null,
    searchword: "",
    searchdata: null,
  };
  componentDidMount() {
    axios
      .get("https://api.jsonbin.io/b/5f69e387302a837e956b59b5")
      .then((result) => {
        this.setState({ data: result.data.tracks });
      });
  }

  /*####################################### Fucntsions #######################################*/

  DeleteHandler = (index) => {
    this.state.data.splice(index, 1);
    this.setState({ date: this.state.data.tracks, currenturl: null });
    setTimeout(() => {
      this.setState({ ...this.state, currenturl: null });
    }, 2);
  };
  AddHandler = () => {
    if (this.state.trackpath) {
      const newtrack = {
        name: this.state.trackname,
        length: this.state.tracklength,
        artist: this.state.trackartist,
        url: this.state.trackpath,
      };
      const newdata = this.state.data.push(newtrack);
      this.setState({
        ...this.state,
        [this.state.data]: newdata,
        addflag: false,
        trackpath: null,
      });
      console.log(this.state.data);
    }
  };
  ToggelHandler = () => {
    this.setState({ ...this.state, addflag: !this.state.addflag });
  };
  SearchChangeHandler = (e) => {
    this.setState({ ...this.state, searchword: e.target.value });
    var newdata = [];
    this.state.data.forEach((element) => {
      if (element.artist === this.state.searchword) {
        newdata.push(element);
        console.log(element);
      }
    });
  };

  /*######################################################################################################## */

  render() {
    var NewData = [null];
    if (this.state.data) {
      this.state.data.forEach((element) => {
        if (element.artist.toLowerCase() === this.state.searchword.toLowerCase()) {
          NewData.push(
            <div
              className="tracklist"
              key={element.url + element.length + element.name}
              onClick={() => {
                  setTimeout(() => {
                    this.setState({ ...this.state, currenturl: null });
                  }, 0);

                  setTimeout(() => {
                    this.setState({
                      ...this.state,
                      currenturl: element.url,
                    });
                  }, 0);
                }}
            >
              <div
                className="viewtrack"
               
              ></div>
              <div className="viewtrack">
                {element.name}
                {"-"}
                {element.artist}
              </div>
              <div className="tracklength">{element.length}</div>
            </div>
          );
        }
      });
    }

    return (
      <div className="App">
        {this.state.data ? (
          <div>
            <div>
              <div>
                <label htmlFor="Search" className="searchword">
                  Search:
                </label>
                <div>
                  <input
                    type="text"
                    placeholder="   search by artist..."
                    onChange={this.SearchChangeHandler}
                    id="Search"
                    className="Searchinput"
                  />
                </div>
              </div>
              {this.state.addflag ? (
                <div>
                  <Addform
                    onchangename={(e) =>
                      this.setState({
                        ...this.state,
                        trackname: e.target.value,
                      })
                    }
                    onChangelength={(e) =>
                      this.setState({
                        ...this.state,
                        tracklength: e.target.value,
                      })
                    }
                    onChangelist={(e) =>
                      this.setState({
                        ...this.state,
                        trackartist: e.target.value,
                      })
                    }
                    onChangepath={(e) =>
                      this.setState({
                        ...this.state,
                        trackpath: e.target.value,
                      })
                    }
                    onClick={() => this.AddHandler()}
                    onClickclose={this.ToggelHandler}
                  />
                </div>
              ) : null}

              {this.state.currenturl ? (
                <audio controls autoPlay>
                  <source src={this.state.currenturl} />
                </audio>
              ) : (
                <div>
                  <audio controls autoPlay>
                    <source src={this.state.currenturl} />
                  </audio>
                </div>
              )}
            </div>
            {!this.state.searchword ? (
              <div>
                {this.state.data.map((track, index) => (
                  <div
                    key={track.url + track.length + track.name}
                    className="tracklist"
                    onClick={() => {
                      setTimeout(() => {
                        this.setState({ ...this.state, currenturl: null });
                      }, 0);

                      setTimeout(() => {
                        this.setState({
                          ...this.state,
                          currenturl: track.url,
                        });
                      }, 0);
                    }}
                  >
                    <div className="viewtrack">
                      {track.name}
                      {"-"}
                      {track.artist}
                    </div>
                    <div className="tracklength">{track.length}</div>

                    <div
                      className="close"
                      onClick={() => this.DeleteHandler(index)}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div> {NewData}</div>
            )}
            <button className="addbutton" onClick={this.ToggelHandler}>
              ADD NEW TRACK
            </button>
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default App;

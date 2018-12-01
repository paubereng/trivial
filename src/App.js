import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <div className="has-text-centered">
          <h1 className="title is-1 has-text-light">TRIVIAL REACT</h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;

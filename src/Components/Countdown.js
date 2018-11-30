import React, { Component } from 'react';
import { connect } from 'react-redux';

class Countdown extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    let { totalQuestions, currentQuestion } = this.props;

    return (
      <div>
        <div className="has-text-centered">
          <p className="title is-1 has-text-light">{`${currentQuestion}/${totalQuestions}`}</p>
        </div>
          <progress
            className="progress progress is-primary"
            value={currentQuestion}
            max={totalQuestions}
          />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    totalQuestions: state.gameOptions.game_set.questions_number,
    currentQuestion: state.gameOptions.question_counter
  };
}

export default connect(mapStateToProps)(Countdown);

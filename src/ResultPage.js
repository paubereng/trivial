import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class ResultPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { correct_answers, question_counter } = this.props.options;
    const { player_name } = this.props.options.game_set;
    return (
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="columns is-mobile">
          <div className="box container">
            <h2 className="title is-2">{`${player_name} your result is ${correct_answers}/${question_counter}`}</h2>
            <Link to="/">
              <button className="button is-medium is-fullwidth is-primary">Play again</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { options: state.gameOptions };
}

export default connect(mapStateToProps)(ResultPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from './reducers/GameOptionsReducer';
import { Link } from 'react-router-dom';

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        players: [1,2,3,4],
        levels: ['easy', 'medium', 'hard'],
        questions_number: [5,10,15]
      },
      game_set: {
        player_name: '',
        level: 'easy',
        questions_number: 5,
        category: ''
      }
    }
  };
  componentDidMount() {
    this.props.resetGame();
    if(!this.props.categories || !this.props.categories.length > 0) {
      this.getCategories();
    }
    // this.getCategories();
  }
  getCategories = () => {
    this.props.fetchCategories();
  }
  renderSelectLevels = () => {
    let { levels } = this.state.options;
    return (
      <div className="field">
        <label className="label">Levels</label>
        <div className="select is-info">
          <select name="level" onChange={this.selectChange}>
            {levels.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>
      </div>
    );
  }
  renderSelectQuestions = () => {
    let { questions_number } = this.state.options;
    return (
      <div className="field">
        <label className="label">Number of questions</label>
        <div className="select is-info">
          <select name="questions_number" onChange={this.selectChange}>
            {questions_number.map(question => <option key={question} value={question}>{question}</option>)}
          </select>
        </div>
      </div>
    );
  }
  renderSelectCategories = () => {
    let { categories } = this.props;

    return (
      <div className="field">
        <label className="label">Categories</label>
        <div className="select is-info">
          <select name="category" onChange={this.selectChange}>
            {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
      </div>
    );
  }
  renderInputPlayer = () => {
    let { player_name } = this.state.game_set;
    return (
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Player 1"
            value={player_name}
            onChange={this.inputPlayerChange}/>
        </div>
      </div>
    )
  }
  inputPlayerChange = ev => {
    let playerName = ev.target.value;

    this.setState({
      ...this.state,
      game_set: {
        ...this.state.game_set,
        player_name: playerName
      }
    });
  }
  selectChange = ev => {
    let selectName = ev.target.name;
    let selectValue = ev.target.value;
    if (selectName === 'questions_number') selectValue = Number(selectValue);

    this.setState({
      ...this.state,
      game_set: {
        ...this.state.game_set,
        [selectName]: selectValue
      }
    });
  }
  clickStartButton = () => {
    this.props.postGameSet(this.state.game_set);
    this.props.fetchQuestions();
  }

  render() {
    return (
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="columns is-mobile">
          <div className="container box">
            <div className="has-text-centered">
              <h3 className="title is-3">Game options</h3>
              <p className="subtitle is-6">Fill the form and start the game</p>
            </div>
            {this.renderSelectLevels()}
            {this.renderSelectQuestions()}
            {this.renderSelectCategories()}
            {/* {this.props.categories && this.props.categories.length > 0 &&
              this.renderSelectCategories()
            } */}
            {this.renderInputPlayer()}

            <Link to="/questions">
              <button
                className="button is-medium is-fullwidth is-primary"
                onClick={this.clickStartButton}
              >
              Start Game
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { categories: state.gameOptions.categories };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionsCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GameForm);

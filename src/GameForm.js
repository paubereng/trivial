import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from './reducers/GameOptionsReducer';
import cs from 'classnames';
import { optionsGame } from './constants';

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        ...optionsGame
      },
      game_set: {
        player_name: 'Player',
        level: 'easy',
        questions_number: 5,
        category: 9
      },
      errors: []
    }
  };
  componentDidMount() {
    this.props.resetGame();
    if(!this.props.categories || !this.props.categories.length > 0) {
      this.getCategories();
    }
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
          <select name="level" onChange={this.selectChange} value={this.state.category}>
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
    let error = this.state.errors.includes('player_name');
    let inputFieldClass = cs('input', {'is-danger': error});
    return (
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className={inputFieldClass}
            type="text"
            placeholder="Player 1"
            value={player_name}
            onChange={this.inputPlayerChange}/>
          </div>
          {error &&
            <p className="help is-danger">Type a name</p>
          }
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
    this.props.history.push('/questions');
  }

  render() {
    return (
      <section className="section">
          <div className="container box game-form">
            <div className="has-text-centered">
              <h3 className="title is-3">Game options</h3>
              <p className="subtitle is-6">Fill the form and start the game</p>
            </div>
            {this.renderSelectLevels()}
            {this.renderSelectQuestions()}
            {this.renderSelectCategories()}
            {this.renderInputPlayer()}

            <button
              className="button is-medium is-fullwidth is-primary"
              onClick={this.clickStartButton}
            >
            Start Game
            </button>
          </div>
      </section>
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

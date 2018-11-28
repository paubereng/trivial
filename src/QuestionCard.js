import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class QuestionCard extends Component {
  constructor(props) {
    super(props);
  }
  getAnswers = question => {
    let { incorrect_answers, correct_answer } = question;
    incorrect_answers.push(correct_answer);
    let answers = _.shuffle(incorrect_answers);

    return (
      <div className="content">
        <ul>
          {answers.map(answer => {
            return(
              <li key={answer}><button value={answer} onClick={this.clickAnswer.bind(this)} className="button is-primary">{answer}</button></li>
            )
          })}
        </ul>
      </div>
    )
  }
  renderQuestionCard = () => {
    let { question } = this.props.data;
    return (
      <div className="box container">
        <h4>{question}</h4>
        <div>
          {this.getAnswers(this.props.data)}
        </div>
      </div>
    )
  }
  clickAnswer = ev => {
    this.props.nextQuestion(ev,this.props.data);
  }
  render() {

    return(
      <div className="column is-three-fifths is-offset-one-fifth">
        <div className="columns is-mobile">
        {this.renderQuestionCard()}
        </div>
      </div>
    )
  }
}

export default QuestionCard;

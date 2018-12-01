import React, { PureComponent  } from 'react';
import _ from 'lodash';

class QuestionCard extends PureComponent  {
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
              <li key={answer}><button value={answer} onClick={this.clickAnswer.bind(this)} className="button is-primary">{decodeURI(answer)}</button></li>
            )
          })}
        </ul>
      </div>
    )
  }
  renderQuestionCard = () => {
    let { question } = this.props.data;
    return (
      <div className="box">
        <h4>{decodeURI(question)}</h4>
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
      <div className="card-question">
        <div>
        {this.renderQuestionCard()}
        </div>
      </div>
    )
  }
}

export default QuestionCard;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionsCreators from './reducers/GameOptionsReducer';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import QuestionCard from './QuestionCard';
import Countdown from './Components/Countdown';

class QuestionsPage extends Component {
  constructor(props) {
    super(props);
  }
  nextQuestion = (ev,question) => {
    let { questions_number } = this.props.options.game_set;
    let { question_counter } = this.props.options;
    let answer = ev.target.value;

    ev.preventDefault();
    this.props.postAnswer(question, answer);
    if((question_counter + 1) == questions_number) {
      this.renderResult();
    }
  }
  renderResult = () => {
    this.props.history.push('/result');
  }
    render() {
      let currentQuestion = this.props.options.question_counter;
      return (
        <section className="section container">
          <div className="countdown-container">
            <Countdown />
          </div>
            {this.props.options.questions && this.props.options.questions.length > 0
              ?
              <TransitionGroup className="card-container">
                  <CSSTransition
                    key={currentQuestion}
                    timeout={500}
                    classNames="slide"
                  >
                    <QuestionCard
                      nextQuestion={this.nextQuestion}
                      data={this.props.options.questions[currentQuestion]}
                    />
                  </CSSTransition>
                </TransitionGroup>
              :
                <div className="has-text-centered">
                  <div className="lds-ripple"><div></div><div></div></div>
                </div>
            }
        </section>
      );
    }
  }

  function mapStateToProps(state) {
    return { options: state.gameOptions };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsCreators, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);

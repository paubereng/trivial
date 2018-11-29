import axios from 'axios';
const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
const POST_GAME_SET = 'POST_GAME_SET';
const POST_ANSWER = 'POST_ANSWER';
const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
const initialState = {
  questions: [],
  game_set: {
    player_name: '',
    level: '',
    questions_number: 0
  },
  question_counter: 0,
  correct_answers: 0
};

export default function(state=initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return state = Object.assign({}, state, { questions: action.data });
    case POST_GAME_SET:
      return state = Object.assign({}, state, { game_set: action.data });
    case POST_ANSWER:
      return state = Object.assign({}, state, {
        correct_answers: state.correct_answers + action.data
      });
    case INCREMENT_QUESTION:
      return state = Object.assign({}, state, {
        question_counter: state.question_counter + action.data
      });
    default:
    return state;
  }
}

export function postGameSet(gameSet) {
  return dispatch => {
    dispatch({
      type: POST_GAME_SET,
      data: gameSet
    });
  }
}

export function postAnswer(question, answer) {
  return dispatch =>  {
    let point = 0;
    if(question.correct_answer === answer){
      point = 1;
    }
    dispatch({
      type: POST_ANSWER,
      data: point
    });
    dispatch(incrementQuestion());
  }
}

function incrementQuestion() {
  return dispatch =>  {
    dispatch({
      type: INCREMENT_QUESTION,
      data: 1
    })
  }
}

export function fetchQuestions() {
  return (dispatch, getState) => {
    const { level, questions_number } = getState().gameOptions.game_set;
    const url = `https://opentdb.com/api.php?amount=${questions_number}&difficulty=${level}&type=multiple`;
    axios.get(url)
      .then(response => {

        dispatch({
          type: FETCH_QUESTIONS,
          data: response.data.results
        })
      })
      .catch(error => {
        throw(error);
      })
  }
}

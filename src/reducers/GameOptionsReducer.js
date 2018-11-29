import axios from 'axios';
import _ from 'lodash';

const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
const POST_GAME_SET = 'POST_GAME_SET';
const POST_ANSWER = 'POST_ANSWER';
const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const initialState = {
  questions: [],
  categories: [],
  game_set: {
    player_name: '',
    level: '',
    questions_number: 0,
    category: ''
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
    case FETCH_CATEGORIES:
      return state = Object.assign({}, state, { categories: action.data });
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


export function fetchCategories() {
  return (dispatch, getState) => {
    const { level, questions_number } = getState().gameOptions.game_set;
    const url = `https://opentdb.com/api_category.php`;
    axios.get(url)
      .then(response => {
        console.log(response.data.trivia_categories);
        dispatch({
          type: FETCH_CATEGORIES,
          data: response.data.trivia_categories
        })
      })
      .catch(error => {
        throw(error);
      })
  }
}

export function fetchQuestions() {
  return (dispatch, getState) => {
    const { level, questions_number, category } = getState().gameOptions.game_set;
    const url = `https://opentdb.com/api.php?amount=${questions_number}&category=${category}&difficulty=${level}&type=multiple`;
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

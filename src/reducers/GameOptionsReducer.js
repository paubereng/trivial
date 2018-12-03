import axios from 'axios';
import { questionsUrl, categoryUrl } from '../constants';

const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
const POST_GAME_SET = 'POST_GAME_SET';
const POST_ANSWER = 'POST_ANSWER';
const INCREMENT_QUESTION = 'INCREMENT_QUESTION';
const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
const RESET_GAME = 'RESET_GAME';

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
      return Object.assign({}, state, { questions: action.data });
    case POST_GAME_SET:
      return Object.assign({}, state, { game_set: action.data });
    case POST_ANSWER:
      return Object.assign({}, state, {
        correct_answers: state.correct_answers + action.data
      });
    case INCREMENT_QUESTION:
      return Object.assign({}, state, {
        question_counter: state.question_counter + action.data
      });
    case FETCH_CATEGORIES:
      return Object.assign({}, state, { categories: action.data });
    case RESET_GAME:
      let newObj = Object.assign({}, state, initialState);
      return Object.assign({}, newObj, { categories: state.categories });
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

export function resetGame() {
  return dispatch => {
    dispatch({
      type: RESET_GAME
    });
  }
}

export function fetchCategories() {
  return (dispatch, getState) => {
    const url = categoryUrl;
    axios.get(url, {crossdomain: true})
      .then(response => {
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
    const url = `${questionsUrl}?amount=${questions_number}&category=${category}&difficulty=${level}&type=multiple`;
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

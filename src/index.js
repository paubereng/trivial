import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import QuestionsPage from './QuestionsPage';
import ResultPage from './ResultPage';
import GameForm from './GameForm';
import createHistory from 'history/createBrowserHistory';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
 ));
const history = createHistory();


ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <App>
        <div>
          <Route exact path="/" component={GameForm} />
          <Route path="/questions" component={QuestionsPage} />
          <Route path="/result" component={ResultPage} />
        </div>
        </App>
    </Router>
</Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

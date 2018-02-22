import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './style/style.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

// import axios from 'axios';
// window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
// registerServiceWorker();

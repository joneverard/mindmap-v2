import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


// import '../style/style.css';
// import './index.css';

import './style/normalize.css';
// import './style/skeleton.css';
import 'materialize-css/dist/css/materialize.min.css';
import './style/style.css';

const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

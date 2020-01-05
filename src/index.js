import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const margin = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30
};

const height = 500;
const width = 650;

ReactDOM.render(<App margin={margin} height={height} width={width} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

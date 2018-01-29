import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<inputForm />, document.getElementById('root'));
ReactDOM.render(<selectInput />, document.getElementById('root'));
ReactDOM.render(<Data />, document.getElementById('root'));

registerServiceWorker();

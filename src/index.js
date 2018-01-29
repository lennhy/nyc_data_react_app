import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Data from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Data />, document.getElementById('root'));
registerServiceWorker();

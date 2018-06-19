import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/jquery/dist/jquery.min.js';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Form boroApts="NYC Apartments"/>
    , document.getElementById('root'));
registerServiceWorker();

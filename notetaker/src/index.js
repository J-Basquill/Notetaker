import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import App from './App';
import{ BrowserRouter } from 'react-router-dom';

ReactDOM.render (
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainRouter />, document.getElementById('root'));
registerServiceWorker();

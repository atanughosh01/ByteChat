import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


// our entire react app is inside the "App" component
// and we are hook-ing that component into the root div
// the root div is inside the ./public/index.html file
ReactDOM.render(<App />, document.getElementById('root'));

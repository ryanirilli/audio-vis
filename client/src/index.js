import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { injectGlobal } from 'styled-components';
injectGlobal`
  body {
    margin: 0;
    overflow: hidden;
  }
`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import './../public/fonts/font.scss';

import { store } from './helper';

ReactDOM.render(
   <Provider store={store}><App />
   </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
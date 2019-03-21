// importing react libraries
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// import main component
import App from './components/App';

// import style
import './styles/index.scss';

// cache your assets when the user is offline or on slow network
registerServiceWorker();

// main renderer of the dashboard
const render = AppComponent => {
    ReactDOM.render(
        <AppComponent/>,
        document.getElementById('root')
    );
};

render(App);



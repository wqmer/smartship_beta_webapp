import 'react-hot-loader/patch' 
import {AppContainer} from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import IndexApp from './container/index';
import configureStore from './configureStore';
import './styles/styles.scss';


const store = configureStore();

ReactDOM.render( 
    <AppContainer>
        <Provider store ={store}>
            <IndexApp/>
        </Provider>
    </AppContainer>
,
document.getElementById('app')
);







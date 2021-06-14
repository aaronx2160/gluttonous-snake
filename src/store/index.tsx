import { createStore } from 'redux';
import {enthusiasm} from "./reducer";
import { EnthusiasmAction } from './actions';
import { StoreState } from './types';
import {composeWithDevTools} from 'redux-devtools-extension'


const store = createStore<StoreState,EnthusiasmAction,any,any>(enthusiasm, {
    foodPos:{x:100,y:100},
    snakeHeadPos:{x:140,y:150},
    score:-10,
    level:-1
},composeWithDevTools());

export default store

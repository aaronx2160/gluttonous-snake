import {EnthusiasmAction} from '../actions';
import {StoreState} from '../types';
import {CHANGE_DIRECTION, GET_FOOD_POSITION, SET_FOOD_POSITION, SET_LEVEL, SET_SCORE} from '../constants';
import {Reducer} from "redux";

export const enthusiasm: Reducer = (
    state: StoreState,
    action: EnthusiasmAction
): StoreState => {
    switch (action.type) {
        case GET_FOOD_POSITION:
            return {...state}
        case SET_FOOD_POSITION:
            return {...state,foodPos:action.payload}
        case SET_SCORE:
            return {...state,score:state.score+1}
        case SET_LEVEL:
            return {...state,level:state.level+1}
        case CHANGE_DIRECTION:
            let flagObj = {x:0,y:0}
            flagObj.x = state.snakeHeadPos.x+action.payload.x
            flagObj.y = state.snakeHeadPos.y+action.payload.y
            return {...state,snakeHeadPos:flagObj}
    }
    return state;
};

import * as constants from '../constants';
import * as types from '../types'

export interface GetFoodPosition {
    type:constants.GET_FOOD_POSITION
}

export interface SetFoodPosition {
    type:constants.SET_FOOD_POSITION,
    payload: types.Position
}

export interface SetScore {
    type:constants.SET_SCORE
}

export interface SetLevel {
    type:constants.SET_LEVEL
}
export interface ChangeDirection {
    type:constants.CHANGE_DIRECTION
    payload:types.Position
}
export type EnthusiasmAction =  GetFoodPosition |SetFoodPosition | SetScore|SetLevel |ChangeDirection;

export function getFoodPosition() :GetFoodPosition{
  return {
      type:constants.GET_FOOD_POSITION,
  }
}

export function setFoodPosition() :SetFoodPosition{
    const top = Math.round(Math.random()*29)*10
    const left = Math.round(Math.random()*29)*10
    return {
        type:constants.SET_FOOD_POSITION,
        payload:{x:top,y:left}
    }
}

export function setScore() :SetScore{
    return {
        type:constants.SET_SCORE,
    }
}

export function setLevel() :SetLevel{
    return {
        type:constants.SET_LEVEL,
    }
}

export function changeDirection(keyCode:string) :ChangeDirection {
    let payload ={x:0,y:0}
    switch (keyCode) {
        case 'ArrowDown':
            payload ={x:0,y: 10}
            break
        case 'ArrowUp':
            payload ={x:0,y: -10}
            break
        case 'ArrowLeft':
            payload ={x:-10,y: 0}
            break
        case 'ArrowRight':
            payload={x:10,y: 0}
    }
    return {type:constants.CHANGE_DIRECTION, payload}
}

export interface StoreState {
    foodPos:Position;
    snakeHeadPos:Position;
    score:number;
    level:number;
}

export interface Position {
    x:number;
    y:number;
}

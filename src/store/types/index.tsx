export interface StoreState {
    languageName: string;
    enthusiasmLevel: number;
    foodPos:Position;
    snakeHeadPos:Position;
    score:number;
    level:number;
}

export interface Position {
    x:number;
    y:number;
}

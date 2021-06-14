import * as React from "react";
import './snake.css'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {projectFirestore,timeStamp} from "../../firebase/config";

import {connect} from "react-redux";
import {StoreState} from "../../store/types";
import {Dispatch} from "redux";
import * as actions from "../../store/actions";



export interface Props {
    snakeHeadPos: { x: number, y: number },
    foodPos: { x: number, y: number },
    score: number
    level: number
    changeDirection?: (keyCode: string) => void
    setFoodPosition?: () => void;
    setScore?: () => void
    setLevel?: () => void
}

interface IState {
    timerId: null | ReturnType<typeof setTimeout>,
    dialogOpen:boolean
}

class Snake extends React.Component<Props, IState> {
    private refSnake: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.refSnake = React.createRef();

    }
    state = {
        timerId: null,
        dialogOpen:false
    }

    componentDidMount() {
        window.addEventListener('keydown', e => {
            this.handleKeydown(e)
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', e => {
            this.handleKeydown(e)
        })
    }

    handleKeydown=(e: KeyboardEvent) =>{
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId!)
        }
        const {changeDirection, level} = this.props
        const speed = level === 0 ? 1000 : 1000 * (1 - level / 10)
        const timeId = setInterval(() => {
            if (changeDirection) {
                changeDirection(e.code)
            }
            this.handleSnakeMove()
        }, speed)
        this.setState({timerId: timeId})
    }

    handleSnakeMove = (): void => {
        const {snakeHeadPos, foodPos, setFoodPosition, setScore, setLevel, score} = this.props
        //eat a food and set a new food  // add points and level up
        if (snakeHeadPos.x === foodPos.x && snakeHeadPos.y === foodPos.y) {
            if (setFoodPosition) {
                setFoodPosition()
            }
            if (setScore) {
                setScore()
            }
            if (setLevel) {
                if ((score + 10) % 30 === 0) {
                    setLevel()
                }

            }
        }
        const Left  =this.refSnake.current!.offsetLeft
        const Top =this.refSnake.current!.offsetTop
        if (Left<0 ||Left>290){
            this.gameOver()
        }
        if (Top<0 ||Top>290){
            this.gameOver()
        }
    }

    gameOver=()=>{
        const {level, score }=this.props
        const username = window.sessionStorage.getItem('username')
        const firestoreRef = projectFirestore.collection('gameData')
        const createdAt = timeStamp()

        if(this.state.timerId!==null){
            clearInterval(this.state.timerId!)
        }
        firestoreRef.add({level:level,score:score,username, createdAt})
        this.setState({dialogOpen:true})
    }

    handleDialogClose =():void=>{
        if (this.state.timerId !== null) {
            clearInterval(this.state.timerId!)
        }
        this.setState({dialogOpen:false})
        window.location.reload();
    }


    render() {
        const {snakeHeadPos,score,level} = this.props
        return (
            <div className='snake'
                 ref={this.refSnake}
                 style={{
                     position: "absolute",
                     left: `${snakeHeadPos.x}px`,
                     top: `${snakeHeadPos.y}px`,
                 }}>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Opps!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            The snake just ran into a wall and crashed. Your were at <span style={{color:'red'}}>level {level}</span> and <span style={{color:'red'}}>score {score}</span> .
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose} color="primary" autoFocus>
                            Restart
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps({snakeHeadPos, foodPos, score, level}: StoreState) {
    return {
        snakeHeadPos,
        foodPos,
        score,
        level
    }
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        setFoodPosition: () => dispatch(actions.setFoodPosition()),
        changeDirection: (keyCode: string) => dispatch(actions.changeDirection(keyCode)),
        setScore: () => dispatch(actions.setScore()),
        setLevel: () => dispatch(actions.setLevel())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snake)

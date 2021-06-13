import * as React from "react";
import './snake.css'

import {connect} from "react-redux";
import {StoreState} from "../../store/types";
import {Dispatch} from "redux";
import * as actions from "../../store/actions";



export interface Props {
    snakeHeadPos: { x: number, y: number }
    changeDirection?: (keyCode: string) => void
    setFoodPosition?: () => void;
}
interface IState {
    timerId:null | ReturnType<typeof setTimeout>
}

class Snake extends React.Component<Props, IState> {

    state={
        timerId:null
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

    handleKeydown(e:KeyboardEvent) {
        if(this.state.timerId!==null){
            clearInterval(this.state.timerId!)
        }
            const {changeDirection} = this.props
            const timeId = setInterval(function () {
                if (changeDirection) {
                    changeDirection(e.code)
                }
            }, 1000)
        this.setState({timerId:timeId})
        }





    render() {
        const {snakeHeadPos} = this.props
        return (
            <div className='snake'
                 style={{
                     position: "absolute",
                     left: `${snakeHeadPos.x}px`,
                     top: `${snakeHeadPos.y}px`,
                 }}>

            </div>
        )
    }
}

function mapStateToProps({snakeHeadPos}: StoreState) {
    return {
        snakeHeadPos
    }
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        setFoodPosition: () => dispatch(actions.setFoodPosition()),
        changeDirection: (keyCode: string) => dispatch(actions.changeDirection(keyCode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Snake)

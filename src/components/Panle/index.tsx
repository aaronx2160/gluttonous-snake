import * as React from "react";
import './panel.css'
import {connect} from "react-redux";
import {StoreState} from "../../store/types";
import {Dispatch} from "redux";
import * as actions from "../../store/actions";

interface Props {
    score: number,
    level: number,
    setScore?: () => void;
    setLevel?: () => void;
}

class Panel extends React.Component<Props, any> {

    componentDidMount() {
        this.setScore()
    }

    setScore() {
        const {setLevel, setScore} = this.props
        if (setLevel) {
            setLevel()
        }
        if (setScore) {
            setScore()
        }
    }

    render() {
        const {score, level} = this.props
        return (
            <div className="score-panel">
                <div>
                    Score:<span id='score'>{score}</span>
                </div>
                <div>
                    Level:<span id='level'>{level}</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps({score, level}: StoreState) {
    return {
        score,
        level
    }
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        setScore: () => dispatch(actions.setScore()),
        setLevel: () => dispatch(actions.setLevel()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)

import * as React from "react";
import './food.css'
import {connect} from "react-redux";
import {StoreState} from "../../store/types";
import {Dispatch} from "redux";
import * as actions from "../../store/actions";


export interface Props {
    foodPos:{x:number,y:number}
    setFoodPosition?: () => void;
}

 class Food extends React.Component<Props, any> {
    private refFood: React.RefObject<HTMLInputElement>;

    constructor(props: Props) {
        super(props);
        this.refFood = React.createRef();

    }

    componentDidMount() {
        this.setFoodPosition()
    }

     setFoodPosition(){
        if(this.props.setFoodPosition){
            this.props.setFoodPosition()
        }

    }

    render() {
        const {foodPos}= this.props
        return (
            <div className="food" ref={this.refFood} style={{
                position: "absolute",
                left: `${foodPos.x}px`,
                top: `${foodPos.y}px`,
            }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

function mapStateToProps({ foodPos }: StoreState) {
    return {
        foodPos
    }
}

function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        setFoodPosition:()=>dispatch(actions.setFoodPosition())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);

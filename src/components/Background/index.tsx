import * as React from 'react';
import './background.css'
import Snake from "../Snake";
import Food from "../Food";
import Panel from "../Panle";

class Background extends React.Component{

    render() {
        return(
            <div className='container'>
                <div className="stage">
                    <Snake></Snake>
                    <Food></Food>
                </div>
               <Panel></Panel>
            </div>
        )
    }
}


export default Background

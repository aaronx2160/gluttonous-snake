import * as React from 'react';
import './background.css'
import Snake from "../Snake";
import Food from "../Food";
import Panel from "../Panle";


const Background =()=>{

        return(
            <div className='container'>
                <p>Press Arrow key to start</p>
                <div className="stage">
                    <Snake/>
                    <Food/>
                </div>
               <Panel/>
            </div>
        )
}


export default Background

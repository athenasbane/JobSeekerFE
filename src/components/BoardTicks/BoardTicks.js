import React from 'react';

import circle from '../../assets/img/circle.png';
import tick from '../../assets/img/tick.svg';

const BoardTicks = (props) => (
    <div style={{width: "100%"}}>
        <div className="columns">
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Indeed</span>
                    {props.boards.indeed ? <span className={"tag is-medium is-success"}>
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className={"tag is-medium is-info"}>
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Reed</span>
                    {props.boards.reed ? <span className={"tag is-medium is-success"}>
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className={"tag is-medium is-info"}>
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">CV Library</span>
                    {props.boards.cvlibrary ? <span className={"tag is-medium is-success"}>
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className={"tag is-medium is-info"}>
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>
            <div className="column is-one-quarter">
                <div style={{width: "100%"}} className="tags has-addons is-centered">
                    <span style={{width: "60%"}} className="tag is-medium">Monster</span>
                    {props.boards.monster ? <span className={"tag is-medium is-success"}>
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className={"tag is-medium is-info"}>
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>       
        </div>
    </div>
);

export default BoardTicks;
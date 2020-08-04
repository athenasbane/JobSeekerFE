import React from 'react';

import circle from '../../assets/img/circle.png';
import tick from '../../assets/img/tick.svg';

const BoardTicks = (props) => (
    <div className="is-centered" style={{width: "100%", height: "100%"}}>
        <div className="columns is-centered is-multiline is-mobile is-desktop mb-1">
            <div className="column is-5">
                <div className="tags has-addons is-centered">
                    <span className="tag is-medium">Reed</span>
                    {props.boards.reed ? <span className="tag is-medium  is-success">
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className="tag is-medium is-info">
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>

            <div className="column is-7">
                <div  className="tags has-addons is-centered">
                    <span className="tag is-medium ">Indeed</span>
                    {props.boards.indeed ? <span className="tag is-medium is-success">
                        <img style={{maxWidth: "20px"}} src={tick} alt="tick" />
                    </span> : 
                    <span className="tag is-medium is-info">
                        <img style={{maxWidth: "20px"}} src={circle} alt="circle" />
                    </span>}
                </div>
            </div>  
        </div>

        <div className="columns is-centered is-multiline is-mobile is-desktop mt-1 mb-1">

            <div className="column is-5">

                <div className="tags has-addons is-centered">

                    <span style={{maxWidth: "70px"}} 
                        className="tag is-medium"
                        >CVLib</span>
                    {props.boards.cvlibrary ? 
                    (<span 
                        className="tag is-medium is-success">
                        <img 
                            style={{maxWidth: "20px"}} 
                            src={tick} alt="tick" />
                    </span>
                    ) : (
                    <span 
                        className="tag is-medium is-info">
                        <img 
                            style={{maxWidth: "20px"}} 
                            src={circle} 
                            alt="circle" />
                    </span>)}

                </div>

            </div>

            <div className="column is-7">

                <div className="tags has-addons is-centered">

                    <span 
                        style={{maxWidth: "70px"}} 
                        className="tag is-medium ">Monster</span>
                    {props.boards.monster ? (
                    
                    <span 
                        className="tag is-medium is-success">
                        <img 
                            style={{maxWidth: "20px"}} 
                            src={tick} alt="tick" />
                    </span> 
                    ) : (
                    <span 
                        className="tag is-medium is-info">
                        <img 
                            style={{maxWidth: "20px"}} 
                            src={circle} 
                            alt="circle" />
                    </span>
                    )}
                </div>
            </div>    
        </div>
    </div>
);

export default BoardTicks;
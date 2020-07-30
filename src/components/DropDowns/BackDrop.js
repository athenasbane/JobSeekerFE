import React from 'react';

const backDrop = (props) => (
    <div>
        {props.backDropOpen ? <div onClick={props.backDropCloseClickHandler} 
        style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%"}}>
        </div> : null}
    </div>
    
);

export default backDrop;
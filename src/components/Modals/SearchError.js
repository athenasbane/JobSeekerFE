import React from 'react';

const searchError = (props) => (
    <div>
        {props.searchErrorModalOpen ? (<article className="message is-danger mb-3">
            <div className="message-header">
                <p>Search Error</p>
                <button onClick={props.searchErrorModalOpenHandler} className="delete" aria-label="delete"></button>
            </div>
            <div className="message-body">
                {props.searchError}
            </div>
        </article>) : null}
    </div>
        
);

export default searchError;
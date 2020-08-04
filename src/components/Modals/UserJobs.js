import React from 'react';

import SavedJobsTable from '../SavedJobs/SavedJobsTable';

const userJobs = (props) => (
    <div className={props.userJobsModalOpen ? "modal is-active" : "modal"}>
        <div onClick={props.userJobsModalOpenHandler} className="modal-background"></div>
            <div style={{width: "80%"}} className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Saved Jobs</p>
                    <button onClick={props.addJobModalOpenHandler} className="button is-dark mr-5 is-size-7-mobile">Add Job</button>
                    <button onClick={props.userJobsModalOpenHandler} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    <SavedJobsTable 
                        savedJobs={props.savedJobs}
                    />
                </section>
            </div>
    </div>
);

export default userJobs;
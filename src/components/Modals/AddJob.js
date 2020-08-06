import React from 'react';

const addJob = (props) => (
    <div className={props.addJobModalOpen ? "modal is-active" : "modal"}>
        <div onClick={props.addJobModalOpenHandler} className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Job</p>
                    <button onClick={props.addJobModalOpenHandler} className="delete" aria-label="close"></button>
                </header>
                <section className="modal-card-body">
                    {props.featureBannerOpen ? 
                    (<div className="notification is-danger">
                        <button onClick={props.featureBannerDeleteHandler} className="delete"></button>
                        <strong>Sorry!</strong> I'm working on this feature! Please bear with me. 
                    </div>) : null}
                    <form
                        onSubmit={props.addJobSubmitHandler} 
                        className="form">
                        <input 
                            onChange={(event) => props.addJobTitleChangeHandler(event)}
                            className={props.addJobTitle !== '' ? "input" : "input is-danger"} 
                            type="text" 
                            placeholder="Title"
                            value={props.addJobTitle}
                            />
                        <input 
                            onChange={(event) => props.addJobCompanyChangeHandler(event)}
                            className={props.addJobCompany !== '' ? "input" : "input is-danger"}
                            type="text" 
                            placeholder="Company"
                            value={props.addJobCompany}
                            />
                            
                        <input 
                            onChange={(event) => props.addJobLocationChangeHandler(event)}
                            className={props.addJobLocation !== '' ? "input" : "input is-danger"}
                            type="text" 
                            placeholder="Location"
                            value={props.addJobLocation}
                            
                            />
                        <div
                            className="select">
                            <select 
                                onChange={(event) => props.addJobStatusChangeHandler(event)} 
                                value={props.addJobStatus}
                                >
                                <option value="saved">Saved</option>
                                <option value="applied">Applied</option>
                            </select>
                        </div>
                        <div className={props.addJobStatus === "applied" ? "field mt-2" : "is-hidden"}>
                            <label className="label">Date Applied</label>
                            <div className="control">
                                <input
                                    onChange={props.addJobAppliedDateChangeHandler} 
                                    className="input" 
                                    type="date" 
                                    value={props.addJobAppliedDate}/>
                            </div>
                        </div>
                        <input 
                            onChange={(event) => props.addJobLinkChangeHandler(event)} 
                            className={props.addJobLink !== '' ? "input" : "input is-danger"}
                            type="url" 
                            placeholder="Job Board URL" 
                            value={props.addJobLink}
                            
                            />
                        <input
                            onChange={(event) => props.addJobSourceChangeHandler(event)}
                            className={props.addJobSource !== '' ? "input" : "input is-danger"}
                            type="text"
                            placeholder="Source"
                            value={props.addJobSource}
                        />
                        <input 
                            className="button mt-3 is-primary" 
                            type="submit" 
                            value="Submit" />
                    </form>
                </section>
                <footer className="modal-card-foot">

                </footer>
            </div>
    </div>
);

export default addJob;
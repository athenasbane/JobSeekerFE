import React, { Component } from 'react';

// External Dependencies
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { uuid } from 'uuidv4';

// Components 
import Header from '../../components/Header/Header';
import JobDropDown from '../../components/DropDowns/JobDropDown';
import UserJobsModal from '../../components/Modals/UserJobs';
import AddJob from '../../components/Modals/AddJob';
import About from '../../components/Modals/About';
import SearchError from '../../components/Modals/SearchError';
import BackDrop from '../../components/DropDowns/BackDrop';
import NavBar from '../../components/NavBar/NavBar';

class Board extends Component {
    
    state = {
        aboutModalOpen: false,
        addJobModalOpen: false,
        addJobTitle: '',
        addJobCompany: '',
        addJobLocation: '',
        addJobSource: '',
        addJobStatus: 'saved',
        addJobLink: '',
        addJobAppliedDate: '',
        mobileBannerOpen: true,
        featureBannerOpen: true,
        searchId: '',
        searchTitle: '',
        searchLocation: '',
        searchTimeScale: '1 Day',
        searchRadius: '1 Mile',
        searchErrorModalOpen: false,
        searchError: '',
        userAuthed: false,
        userDropDown: false,
        backDropOpen: false,
        userJobsModalOpen: false,
        heroOpen: true,
        loginOpen: false,
        loginNotRegister: true,
        loginEmail: '',
        loginPassword: '',
        loginError: '',
        registerEmail: '',
        registerPassword: '',
        registerPasswordRepeat: '',
        registerError: '',
        loading: false,
        jobs: [],
        savedJobs: [],
        user: {},
        userToken: '',
        boards: {
            indeed: false,
            reed: false,
            monster: false,
            cvlibrary: false
        }
    
    }

    // Layout

    heroDeleteButtonHandler = () => {
        this.setState({ heroOpen: false });
    }

    mobileBannerDeleteButtonHandler = () => {
        this.setState({ mobileBannerOpen: false });
    }

    featureBannerDeleteHandler = () => {
        this.setState({ featureBannerOpen: false });
    }

    // About

    aboutModalOpenHandler = () => {
        this.setState({ aboutModalOpen: !this.state.aboutModalOpen });
    }

    // Search Functions

    searchTitleChangeHandler = (e) => {
        this.setState({ searchTitle: e.target.value });
    }

    searchLocationChangeHandler = (e) => {
        this.setState({ searchLocation: e.target.value });
    }

    searchTimeScaleChangeHandler = (e) => {
        console.log(this.state.searchTimeScale)
        this.setState({ searchTimeScale: e.target.value });
        
    }

    searchRadiusChangeHandler = (e) => {
        console.log(this.state.searchRadius)
        this.setState({ searchRadius: e.target.value });
        
    }

    searchSubmitHandler = (e) => {
        e.preventDefault();

        if(this.state.searchTitle === '' || this.state.searchLocation === '') {
            this.setState({ searchError: 'Please complete all fields', 
            searchErrorModalOpen: !this.state.searchErrorModalOpen });
            return;
        }

        const boardReset = {
            indeed: false,
            reed: false,
            monster: false,
            cvlibrary: false
        }

        this.setState({ loading: true, 
            searchErrorModalOpen: false,
            searchError: ''});

        axios.post('https://jobseeker-backend.herokuapp.com/jobs', {
            title: this.state.searchTitle,
            location: this.state.searchLocation,
            radius: this.state.searchRadius,
            timeScale: this.state.searchTimeScale
        }).then(response => {
            this.setState({  
                searchId: response.data.id,
                boards: boardReset
            });
        }).catch(e => {
            console.log(e);
        });
    }

    searchErrorModalOpenHandler = () => {
        this.setState({ searchErrorModalOpen: !this.state.searchErrorModalOpen });
    }

    updateJobsSearch = () => {
        axios.get(`https://jobseeker-backend.herokuapp.com/jobs/more/${this.state.searchId}`)
        .then(response => {
            
            const data = [ ...response.data.jobs ]
            const jobsUpdated = data.map((job, index) => {
                job['action'] = false;
                job['id'] = uuid();
                job['index'] = index;
                return job;
            }) 
            
            this.setState({ jobs: [ ...jobsUpdated ] });
        })
        .catch(e => {
            console.log(e)
        });
    }

    stopLoading = () => {
        this.setState({ loading: false });
    }

    // Login and register Handlers

    // Login Handlers
    
    loginModalOpenHandler = () => {
        const modalState = this.state.loginOpen;
        this.setState({ loginOpen: !modalState });
    }

    loginEmailChangeHandler = (e) => {
        this.setState({ loginEmail: e.target.value });
    }

    loginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    loginSubmitHandler = (e) => {
        e.preventDefault()
        const email = this.state.loginEmail;
        const password = this.state.loginPassword;

        if(email === '' || password === '') {
            this.setState({ loginError: 'Please complete all forms' });
            return;
        }

        axios.post('https://jobseeker-backend.herokuapp.com/users/login', {
            email,
            password
        })
        .then(response => {
            localStorage.setItem('token', response.data.token)
            this.setState({ 
                loginEmail: '',
                loginPassword: '',
                loginOpen: false,
                userAuthed: true,
                token: response.data.token
             });
        })
        .catch(e => {
            console.log(e);
        });
    }

    loginRegisterBtnHandler = (e) => {
        e.preventDefault()
        this.setState({ loginNotRegister: false })
    }

    logoutHandler = () => {
        axios.post('https://jobseeker-backend.herokuapp.com/users/logout', {
            user: this.state.user }, 
            {headers: {Authorization: `Bearer ${this.state.token}`}})
        .then(response => {
            this.setState({ userAuthed: false });
            localStorage.removeItem('token');
        })
        .catch(e => {
            console.log(e);
        })
    }

    // Register Handlers

    registerLoginBtnHandler = (e) => {
        e.preventDefault();
        this.setState({ loginNotRegister: true });
    }

    registerEmailChangeHandler = (e) => {
        this.setState({ registerEmail: e.target.value });
    }

    registerPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    registerPasswordRepeatChangeHandler = (e) => {
        this.setState({ registerPasswordRepeat: e.target.value });
    }

    registerSubmitHandler = (e) => {
        e.preventDefault()
        const email = this.state.registerEmail;
        const password = this.state.registerPassword;
        const passwordRepeat = this.state.registerPasswordRepeat;

        if(password !== passwordRepeat) {
            this.setState({ registerError: 'Passwords do not match' });
            return;
        }

        if(email === '' || password === '' || passwordRepeat === '') {
            this.setState({ registerError: 'Please complete all the fields' });
            return;
        } 

        axios.post('https://jobseeker-backend.herokuapp.com/users/register', {
            email,
            password
        })
        .then(response => {
            this.setState({
                registerError: '',
                registerEmail: '',
                registerPassword: '',
                registerPasswordRepeat: '',
                loginNotRegister: true
            })
        })
        .catch(error => {
            console.log(error);
        });
    }

    registerMessageDismissHandler = () => {
        this.setState({ registerError: '' });
    }

    sessionCheck = () => {

        if(localStorage.getItem('token') === null) {
            this.setState({ userAuthed: false });
            return;
        }
        
        axios.post('https://jobseeker-backend.herokuapp.com/users/auth', {
            token: localStorage.getItem('token')
        })
        .then(response => {
            this.setState({
                userAuthed: true, 
                user: response.data.user,
                token: localStorage.getItem('token')
            });
    
        })
        .catch(e => {
            console.log(e);
        })

    }

    // user actions

    userDropDownHandler = () => {
        let newState = !this.state.userDropDown;
        this.setState({ userDropDown: newState, 
        backDropOpen: !this.state.backDropOpen
        });
    
    }

    userJobsModalOpenHandler = (arg) => {
        
        let query = '';

        if (arg === 'applied') {
            query = '?applied=true';
        } else if (arg === 'saved') {
            query = '?applied=false';
        }

        axios.get(`https://jobseeker-backend.herokuapp.com/users/jobs${query}`, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => {
            this.setState({ savedJobs: response.data });
        })
        .catch(e => {
            console.log(e);
        });

        this.setState({ userJobsModalOpen: !this.state.userJobsModalOpen });
    }

    // Jobs Handlers

    // Add Job Handlers

    addJobModalOpenHandler = () => {
        this.setState({ addJobModalOpen: !this.state.addJobModalOpen });
    }

    addJobTitleChangeHandler = (e) => {
        this.setState({ addJobTitle: e.target.value });
    }

    addJobCompanyChangeHandler = (e) => {
        this.setState({ addJobCompany: e.target.value });
    }

    addJobLocationChangeHandler = (e) => {
        this.setState({ addJobLocation: e.target.value });
    }

    addJobStatusChangeHandler = (e) => {
        this.setState({ addJobStatus: e.target.value });
    }

    addJobAppliedDateChangeHandler = (e) => {
        this.setState({ addJobAppliedDate: e.target.value });
    }

    addJobLinkChangeHandler = (e) => {
        this.setState({ addJobLink: e.target.value });
    }

    addJobSourceChangeHandler = (e) => {
        this.setState({ addJobSource: e.target.value })
    }

    addJobSubmitHandler = (e) => {
        e.preventDefault()

        const job = {
            title: this.state.addJobTitle,
            company: this.state.addJobCompany,
            location: this.state.addJobLocation,
            source: this.state.addJobSource,
            link: this.state.addJobLink,
            applied: this.state.addJobStatus === 'applied' ? true : false,
            date: this.state.addJobStatus === 'applied' ? this.state.addJobAppliedDate : null
        }

        axios.post('https://jobseeker-backend.herokuapp.com/users/jobs/add', 
        { job, }, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => { 
            this.setState({ addJobModalOpen: false,
                            addJobTitle: '',
                            addJobCompany: '',
                            addJobLocation: '',
                            addJobSource: '',
                            addJobStatus: 'saved',
                            addJobLink: '',
                            addJobAppliedDate: ''

        });
        })
        .catch(e => console.log(e));

    }

    // User Jobs 

    jobDropDownClickHandler = (index) => {
        const currentJobs = [ ...this.state.jobs];

        currentJobs[index]['action'] = !currentJobs[index]['action'];

        this.setState({ jobs: currentJobs, backDropOpen: !this.state.backDropOpen });
    }

    jobSavedClickHandler = (index) => {
        axios.post('https://jobseeker-backend.herokuapp.com/users/jobs/save', 
        { job: this.state.jobs[index] }, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => {
            let currentState = [ ...this.state.jobs ];
            currentState[index].action = false;
            this.setState({ jobs: currentState });
            this.backDropCloseClickHandler()})
        .catch(e => console.log(e));
    }

    jobAppliedClickHandler = (index) => {
        const job = this.state.jobs[index];

        job.applied = true;
        
        axios.post('https://jobseeker-backend.herokuapp.com/users/jobs/save', 
        { job, }, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => { 
            let currentState = [ ...this.state.jobs ];
            currentState[index].action = false;
            this.setState({ jobs: currentState });
            this.backDropCloseClickHandler()})
        .catch(e => console.log(e));
        
    }

    backDropCloseClickHandler = () => {

        if(this.state.jobs.length !== 0) {
            const currentJobState = [ ...this.state.jobs];
            currentJobState.forEach(job => job['action'] = false);
            this.setState({ jobs: currentJobState, backDropOpen: false });
            return;
        }

        this.setState({ 
            userDropDown: false, 
            backDropOpen: false,

            });
    }

    componentDidMount() {
        this.sessionCheck()
        const socket = socketIOClient('https://jobseeker-backend.herokuapp.com');
        socket.on('connect', () => {
        socket.on('message', (msg) => {
            let boardState = { ...this.state.boards };
            switch (msg) {
                case '[Reed] - [Success]':
                    boardState = { ...this.state.boards };
                    boardState['reed'] = true;
                    this.setState({ boards: boardState });
                    this.updateJobsSearch()
                    console.log(this.state.jobs);
                    break;
                case '[Indeed] - [Success]':
                    boardState = { ...this.state.boards };
                    boardState['indeed'] = true;
                    this.setState({ boards: boardState });
                    this.updateJobsSearch()
                    console.log(this.state.jobs);
                    break;
                case '[Monster] - [Success]':
                    boardState = { ...this.state.boards };
                    boardState['monster'] = true;
                    this.setState({ boards: boardState });
                    this.updateJobsSearch()
                    console.log(this.state.jobs);
                    break;
                case '[CVLibrary] - [Success]':
                    boardState = { ...this.state.boards };
                    boardState['cvlibrary'] = true;
                    this.setState({ boards: boardState });
                    this.updateJobsSearch();
                    console.log(this.state.jobs);
                    break;
                default:
                    console.error('Error!');    
            }
            if(this.state.loading === true 
                && this.state.boards.indeed === true
                && this.state.boards.reed === true
                && this.state.boards.cvlibrary === true
                && this.state.boards.monster === true) {
                    this.stopLoading()
                }
            });
        });   
    }

    render() {

        let tableResults = (<tr><td>No Results</td></tr>);

        if(this.state.jobs.length > 0) {
            tableResults = this.state.jobs.map(el => (
                <tr key={el.id} >
                    <td><strong><a 
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{maxWidth: "25%", overflow: "wrap", color: "black"}} 
                        href={el.link}>{el.title}</a></strong></td>
                    <td style={{overflow: "wrap"}}>{el.company}</td>
                    <td className="is-hidden-mobile">{el.location}</td>
                    <td className="is-hidden-mobile">{el.source}</td>
                    {this.state.userAuthed ? <td><JobDropDown

                    jobSavedClickHandler={this.jobSavedClickHandler}
                    jobAppliedClickHandler={this.jobAppliedClickHandler}

                    job={el} 
                    jobDropDownClickHandler={() => this.jobDropDownClickHandler(el.index)}/></td> : null}
                </tr>
            ));
        }

        let searchButtonClasses = 'button is-primary';

        if(this.state.loading) {
            searchButtonClasses = 'button is-primary is-loading';
        }

        return (
            <div>
                <section className={this.state.heroOpen ? "hero is-small is-primary is-bold is-hidden-mobile" : "hero is-small is-primary is-bold is-hidden is-hidden-mobile"}>
                    <div className="hero-body">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item has-text-left">
                                    <h1 className="title">
                                        Currently in Beta!
                                    </h1>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <button onClick={this.heroDeleteButtonHandler} 
                                        className="delete"></button>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </section>
                <NavBar 
                    aboutModalOpenHandler={this.aboutModalOpenHandler}

                    addJobModalOpenHandler={this.addJobModalOpenHandler}
                    addJobModalOpen={this.state.addJobModalOpen}

                    boards={this.state.boards}

                    userAuthed={this.state.userAuthed}
                    userDropDownHandler={this.userDropDownHandler}
                    userDropDown={this.state.userDropDown}


                    userJobsModalOpenHandler={this.userJobsModalOpenHandler}
                    userJobsModalOpen={this.state.userJobsModalOpen}

                    searchSubmitHandler={this.searchSubmitHandler}
                    searchTitleChangeHandler={this.searchTitleChangeHandler}
                    searchLocationChangeHandler={this.searchLocationChangeHandler}
                    searchTimeScaleChangeHandler={this.searchTimeScaleChangeHandler}
                    searchRadiusChangeHandler={this.searchRadiusChangeHandler}
                    searchButtonClasses={searchButtonClasses}

                    loginNotRegister={this.state.loginNotRegister}

                    loginModalOpenHandler={this.loginModalOpenHandler}
                    loginOpen={this.state.loginOpen}
                    loginEmailChangeHandler={this.loginEmailChangeHandler}
                    loginPasswordChangeHandler={this.loginPasswordChangeHandler}
                    loginSubmitHandler={this.loginSubmitHandler}
                    loginRegisterBtnHandler={this.loginRegisterBtnHandler}
                    loginError={this.state.loginError}

                    logoutHandler={this.logoutHandler}

                    registerEmailChangeHandler={this.registerEmailChangeHandler}
                    registerPasswordChangeHandler={this.registerPasswordChangeHandler}
                    registerPasswordRepeatChangeHandler={this.registerPasswordRepeatChangeHandler}
                    registerSubmitHandler={this.registerSubmitHandler}
                    registerLoginBtnHandler={this.registerLoginBtnHandler}
                    registerError={this.state.registerError}
                    registerMessageDismissHandler={this.registerMessageDismissHandler}
                />
                <Header 
                    aboutModalOpenHandler={this.aboutModalOpenHandler}
                    
                    boards={this.state.boards}

                    userAuthed={this.state.userAuthed}
                    userDropDownHandler={this.userDropDownHandler}
                    userDropDown={this.state.userDropDown}

                    userJobsModalOpenHandler={this.userJobsModalOpenHandler}
                    userJobsModalOpen={this.state.userJobsModalOpen}

                    searchSubmitHandler={this.searchSubmitHandler}

                    searchTitleChangeHandler={this.searchTitleChangeHandler}
                    searchTitle={this.state.searchTitle}

                    searchLocationChangeHandler={this.searchLocationChangeHandler}
                    searchLocation={this.state.searchLocation}
                    
                    searchTimeScaleChangeHandler={this.searchTimeScaleChangeHandler}
                    searchTimeScale={this.state.searchTimeScale}

                    searchRadiusChangeHandler={this.searchRadiusChangeHandler}
                    searchRadius={this.state.searchRadius}

                    searchButtonClasses={searchButtonClasses}

                    loginNotRegister={this.state.loginNotRegister}

                    loginModalOpenHandler={this.loginModalOpenHandler}
                    loginOpen={this.state.loginOpen}
                    loginEmailChangeHandler={this.loginEmailChangeHandler}
                    loginPasswordChangeHandler={this.loginPasswordChangeHandler}
                    loginSubmitHandler={this.loginSubmitHandler}
                    loginRegisterBtnHandler={this.loginRegisterBtnHandler}
                    loginError={this.state.loginError}

                    logoutHandler={this.logoutHandler}

                    registerEmailChangeHandler={this.registerEmailChangeHandler}
                    registerPasswordChangeHandler={this.registerPasswordChangeHandler}
                    registerPasswordRepeatChangeHandler={this.registerPasswordRepeatChangeHandler}
                    registerSubmitHandler={this.registerSubmitHandler}
                    registerLoginBtnHandler={this.registerLoginBtnHandler}
                    registerError={this.state.registerError}
                    registerMessageDismissHandler={this.registerMessageDismissHandler}
                />

                <UserJobsModal 
                    addJobModalOpenHandler={this.addJobModalOpenHandler}
                    savedJobs={this.state.savedJobs}
                    userJobsModalOpen={this.state.userJobsModalOpen}
                    userJobsModalOpenHandler={this.userJobsModalOpenHandler}
                />

                <About 
                    aboutModalOpen={this.state.aboutModalOpen}
                    aboutModalOpenHandler={this.aboutModalOpenHandler}
                
                />

                <AddJob 
                    addJobModalOpenHandler={this.addJobModalOpenHandler}
                    addJobModalOpen={this.state.addJobModalOpen}
                    addJobSubmitHandler={this.addJobSubmitHandler}

                    addJobTitleChangeHandler={this.addJobTitleChangeHandler}
                    addJobTitle={this.state.addJobTitle}

                    addJobCompanyChangeHandler={this.addJobCompanyChangeHandler}
                    addJobCompany={this.state.addJobCompany}

                    addJobLocationChangeHandler={this.addJobLocationChangeHandler}
                    addJobLocation={this.state.addJobLocation}

                    addJobStatusChangeHandler={this.addJobStatusChangeHandler}
                    addJobStatus={this.state.addJobStatus}

                    addJobAppliedDateChangeHandler={this.addJobAppliedDateChangeHandler}
                    addJobAppliedDate={this.state.addJobAppliedDate}

                    addJobLinkChangeHandler={this.addJobLinkChangeHandler}
                    addJobLink={this.state.addJobLink}

                    addJobSourceChangeHandler={this.addJobSourceChangeHandler}
                    addJobSource={this.state.addJobSource}

                    featureBannerDeleteHandler={this.featureBannerDeleteHandler}
                    featureBannerOpen={this.state.featureBannerOpen}

                />

                <SearchError 
                    searchErrorModalOpen={this.state.searchErrorModalOpen}
                    searchErrorModalOpenHandler={this.searchErrorModalOpenHandler}
                    searchError={this.state.searchError}
                />

                <BackDrop 
                    backDropCloseClickHandler={this.backDropCloseClickHandler}
                    backDropOpen={this.state.backDropOpen}
                /> 

                <div className={this.state.mobileBannerOpen ? "notification is-info is-hidden-desktop" : "notification is-info is-hidden"}>
                    <button onClick={this.mobileBannerDeleteButtonHandler} className="delete"></button>
                    <strong>Just a warning!</strong> Job Seeker's functionality is limited due to space on smaller screens. 
                    You can request the full site or access on your desktop to get the full experience.
                </div>

                <div style={{ width: "100%" }} className="box is-centered mt-2">
                    <div style={{ width: "100%" }} className="table-container">
                        <table className="table is-narrow" style={{ width: "100%", marginBottom: "100px" }}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Company</th>
                                    <th className="is-hidden-mobile">Location</th>
                                    <th className="is-hidden-mobile">Source</th>
                                    {this.state.userAuthed ? <th>Action</th> : null}
                                </tr>
                            </thead>
                            <tbody>
                                {tableResults}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Board;

import React, { Component } from 'react';

// External Dependencies
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { uuid } from 'uuidv4';

// Components 
import Header from '../../components/Header/Header';
import JobDropDown from '../../components/DropDowns/JobDropDown';
import UserJobsModal from '../../components/Modals/UserJobs';
import About from '../../components/Modals/About';
import SearchError from '../../components/Modals/SearchError';
import BackDrop from '../../components/DropDowns/BackDrop';

class Board extends Component {
    
    state = {
        aboutModalOpen: false,
        searchId: '',
        searchTitle: '',
        searchLocation: '',
        searchTimeScale: '',
        searchRadius: '',
        searchErrorModalOpen: false,
        searchError: '',
        userAuthed: false,
        userDropDown: false,
        backDropOpen: false,
        userJobsModalOpen: false,
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

    // About

    aboutModalOpenHandler = () => {
        this.setState({ aboutModalOpen: !this.state.aboutModalOpen })
    }

    // Search Functions

    searchTitleChangeHandler = (e) => {
        this.setState({ searchTitle: e.target.value });
    }

    searchLocationChangeHandler = (e) => {
        this.setState({ searchLocation: e.target.value })
    }

    searchTimeScaleChangeHandler = (e) => {
        this.setState({ searchTimeScale: e.target.value })
    }

    searchRadiusChangeHandler = (e) => {
        this.setState({ searchRadius: e.target.value })
    }

    searchSubmitHandler = (e) => {
        e.preventDefault();

        if(this.state.searchTitle === '' || this.state.searchLocation === '') {
            this.setState({ searchError: 'Please complete all fields', 
            searchErrorModalOpen: !this.state.searchErrorModalOpen });
            return;
        }

        if(this.state.searchTitle.includes(' ') || this.state.searchLocation.includes(' ')) {
            this.setState({ searchError: 'The search function only supports single words for now', 
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
            searchTimeScale: this.state.searchTimeScale
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
        this.setState({ searchErrorModalOpen: !this.state.searchErrorModalOpen })
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
            

            this.setState({ jobs: [ ...jobsUpdated ] })
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
        const modalState = this.state.loginOpen
        this.setState({ loginOpen: !modalState })
    }

    loginEmailChangeHandler = (e) => {
        this.setState({ loginEmail: e.target.value })
    }

    loginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value })
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
             })
        })
        .catch(e => {
            console.log(e)
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
            this.setState({ userAuthed: false })
            localStorage.removeItem('token')
        })
        .catch(e => {
            console.log(e)
        })
    }

    // Register Handlers

    registerLoginBtnHandler = (e) => {
        e.preventDefault()
        this.setState({ loginNotRegister: true })
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
            return
        }

        if(email === '' || password === '' || passwordRepeat === '') {
            this.setState({ registerError: 'Please complete all the fields' });
            return
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
        })
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
            })
    
        })
        .catch(e => {
            console.log(e)
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
            this.setState({ savedJobs: response.data })
        })
        .catch(e => {
            console.log(e)
        });

        this.setState({ userJobsModalOpen: !this.state.userJobsModalOpen });
    }

    jobDropDownClickHandler = (index) => {
        const currentJobs = [ ...this.state.jobs];

        currentJobs[index]['action'] = !currentJobs[index]['action'];

        this.setState({ jobs: currentJobs, backDropOpen: !this.state.backDropOpen })
    }

    jobSavedClickHandler = (index) => {
        axios.post('https://jobseeker-backend.herokuapp.com/users/jobs/save', 
        { job: this.state.jobs[index] }, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => console.log('Test'))
        .catch(e => console.log(e));
    }

    jobAppliedClickHandler = (index) => {
        
        const job = this.state.jobs[index];

        job.applied = true;
        
        axios.post('https://jobseeker-backend.herokuapp.com/users/jobs/save', 
        { job, }, 
        { headers: {Authorization: `Bearer ${this.state.token}`} })
        .then(response => console.log('Test'))
        .catch(e => console.log(e));
        
    }

    backDropCloseClickHandler = () => {

        if(this.state.jobs.length !== 0) {
            const newJobs = this.state.jobs.forEach(job => job['action'] = false)
            console.log(newJobs)
        }

        this.setState({ 
            userDropDown: false, 
            backDropOpen: false,
            })
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
            <div className="is-centered">
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
                <UserJobsModal 
                    savedJobs={this.state.savedJobs}
                    userJobsModalOpen={this.state.userJobsModalOpen}
                    userJobsModalOpenHandler={this.userJobsModalOpenHandler}
                />
                <About 
                    aboutModalOpen={this.state.aboutModalOpen}
                    aboutModalOpenHandler={this.aboutModalOpenHandler}
                
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

                <div style={{ width: "100%" }} className="box is-centered">
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

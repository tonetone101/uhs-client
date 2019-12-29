import React, { Component } from "react";
import { list, read } from "./apiFaculty";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../../auth'


class Faculty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            faculties: [],
            page: 1,
            term: '',
            searched: false,
            searchedFaculty: '',
            error: '',
            searching: false,
        };
    }

    loadFaculties = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ faculties: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadFaculties(this.state.faculties)
        console.log(this.state.faculties)
    }

    handleChange = event => {
        this.setState({error: ''})
        this.setState({term: event.target.value})
    }

    search = (e) => {
        e.preventDefault()
        this.state.faculties.map(staff => {
            if (staff.name === this.state.term) {
                this.setState({searched: true, searchedFaculty: staff})
            } else {
                this.setState({searching: true, error: 'Staff member not found'})
            }
        })

    }

    renderFaculties = faculties => {

        return (
            <div  id='event' className='row container'>
                {faculties.map((faculty, i) => {
                    const posterId = faculty.postedBy
                        ? `/user/${faculty.postedBy._id}`
                        : "";
                    const posterName = faculty.postedBy
                        ? faculty.postedBy.name
                        : " Unknown";

                        const photoUrl = faculty.postedBy
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const facultyPhoto = faculty._id
                        ? `${process.env.REACT_APP_API_URL}/faculty/photo/${
                            faculty._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                <br />

                                <div className="card-text column mr-5">
                                    <p >
                                        Faculty Title: {faculty.title.substring(0, 100)}{' '}
                                    </p>  
                                    
                                    {/* <p >
                                       Date : {event.date.substring(0, 100)}{' '}
                                    </p>   */}

                                    {/* <p >
                                       Time: {event.time.substring(0, 100)}{' '}
                                    </p>  */}

                                     <p >
                                      Name: {faculty.name.substring(0, 100)}{' '}
                                    </p>      

                                    <p >
                                       About: {faculty.about.substring(0, 100)}{' '}
                                    </p>           
                                </div>
                                                       
                                <div className='column'>
                                    <img
                                        src={facultyPhoto}
                                        className="img-thunbnail mb-3"
                                        style={{ height: "200px", width: "300px" }}
                                    />
                                
                                    <Link
                                        to={`/faculty/${faculty._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        Read more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, faculties, searched, searchedFaculty, error } = this.state;

        if (searched) { return <Redirect to={`faculty/${searchedFaculty._id}`}/> } 

        return (
            <div className="container">
                <div className='row mt-4 mb-3'>
                    <h2 className="col-md-6">
                        Our Team
                        {!faculties.length ? "Loading..." : ""}
                    </h2>

                    <form className="col-md-6">
                        <input placeholder='by faculty name' type='text' value={this.state.term} onChange={this.handleChange} />
                        <button onClick={this.search}>Search</button>
                        {"  "}{error}
                    </form>
                    <hr/>
                </div>
                {
                    isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                        <div>
                            <Link className='mb-5' to='/new/faculty'>Add Faculty</Link>
                        </div>
                    )
                }
               
                <div>               
                    {this.renderFaculties(faculties)}
                 </div>   
               
            </div>
        );
    }
}

export default Faculty;
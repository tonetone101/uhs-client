import React, { Component } from "react";
import { list, read } from "./apiFaculty";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../auth'


class Faculty extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            faculties: [],
            page: 1
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

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadEvents(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadEvents(this.state.page - number);
    };

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
        const { user, faculties } = this.state;
        console.log(faculties)
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!faculties.length ? "Loading..." : ""}
                </h2>
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
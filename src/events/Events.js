import React, { Component } from "react";
import { list, read } from "./apiEvent";
import { Link } from "react-router-dom";
import {isAuthenticated} from '../auth'


class Events extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            events: [],
            page: 1
        };
    }

    loadEvents = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data)
                this.setState({ events: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadEvents(this.state.events)
        console.log(this.state.events)
    }

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadEvents(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadEvents(this.state.page - number);
    };

    renderEvents = events => {

        return (
            <div  id='event' className='row container'>
                {events.map((event, i) => {
                    const posterId = event.postedBy
                        ? `/user/${event.postedBy._id}`
                        : "";
                    const posterName = event.postedBy
                        ? event.postedBy.name
                        : " Unknown";

                        const photoUrl = event.postedBy
                        ? `${process.env.REACT_APP_API_URL}/user/photo/${
                            event.postedBy._id
                          }?${new Date().getTime()}`
                        : ''

                        const eventPhoto = event._id
                        ? `${process.env.REACT_APP_API_URL}/event/photo/${
                            event._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                
                               
                                <p className="font-italic mark mt-4">
                                    Event Posted{" "}

                                    {/* <Link to={`${posterId}`}>
                                        <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                                        {posterName}{" "}
                                    </Link> */}
                                    on{' '}
                                    {new Date(event.created).toDateString()}
                                </p>
                                <br />

                                <div className="card-text column mr-4">
                                    <p >
                                        Event name: {event.title.substring(0, 100)}{' '}
                                    </p>  
                                    
                                    {/* <p >
                                       Date : {event.date.substring(0, 100)}{' '}
                                    </p>   */}

                                    {/* <p >
                                       Time: {event.time.substring(0, 100)}{' '}
                                    </p>  */}

                                     <p >
                                       Location : {event.where.substring(0, 100)}{' '}
                                    </p>      

                                    <p >
                                       Description : {event.body.substring(0, 100)}{' '}
                                    </p>           
                                </div>
                                                       
                             
                                {/* <img
                                    src={eventPhoto}
                                    className="img-thunbnail mb-3"
                                    style={{ height: "200px", width: "100%" }}
                                /> */}
                                <Link
                                    to={`/event/${event._id}`}
                                    className="btn btn-raised btn-primary btn-sm mb-4"
                                >
                                    Read more
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { user, events } = this.state;
        console.log(events)
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!events.length ? "Loading..." : ""}
                </h2>
                {
                    isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                        <div>
                            <Link className='mb-5' to='/new/event'>Add Event</Link>
                        </div>
                    )
                }
               
                <div>               
                    {this.renderEvents(events)}
                 </div>   
               
            </div>
        );
    }
}

export default Events;
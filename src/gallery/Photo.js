import React, { Component } from "react";
import { list, read } from "./apiPhoto";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated} from '../auth'


class Photo extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            images: [],
            page: 1,
            error: '',
        };
    }

    loadImages = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ images: data });
                

            }
        });
    };


    componentDidMount() {
        this.loadImages(this.state.images)
    }

    renderImages = images => {

        return (
            <div className='row container'>
                {images.map((image, i) => {

                        const imagePhoto = image._id
                        ? `${process.env.REACT_APP_API_URL}/image/photo/${
                            image._id
                          }?${new Date().getTime()}`
                        : ''
                        
                    return (
                        <div  className="card col-md-6 mb-4" key={i}>
                            <div  >
                                <br />

                                <div className="card-text column mr-5">
                                    <p >
                                        {image.caption.substring(0, 100)}{' '}
                                    </p>  
                                    
                                    {/* <p >
                                       Date : {event.date.substring(0, 100)}{' '}
                                    </p>   */}

                                    {/* <p >
                                       Time: {event.time.substring(0, 100)}{' '}
                                    </p>  */}
          
                                </div>
                                                       
                                <div className='column'>
                                    <img
                                        src={imagePhoto}
                                        className="img-thunbnail mb-3"
                                        style={{ height: "200px", width: "300px" }}
                                    />
                                
                                    <Link
                                        to={`/image/${image._id}`}
                                        className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                                    >
                                        View
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
        const { user, images, error } = this.state;

        return (
            <div className="container">
                <div className='row mt-4 mb-3'>
                    <h2 className="col-md-6">
                        Captured Moments
                        {!images.length ? "Loading..." : ""}
                    </h2>

                    <hr/>
                </div>
                {
                    isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                        <div>
                            <Link className='mb-5' to='/new/image'>Add New Photo</Link>
                        </div>
                    )
                }
               
                <div>               
                    {this.renderImages(images)}
                 </div>   
               
            </div>
        );
    }
}

export default Photo;
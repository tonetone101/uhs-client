import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {singleCarousel, update, list} from './apiCarousel'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {Animated} from "react-animated-css"

class Carol extends Component {
    state = {
        carousel: [],
        redirectToHome: false,
        redirectToSignIn: false
    }

    componentDidMount = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5df13dc7cbb9d09380910cfd") {
                        return d
                    }
                }) 
              })
              
            }
        }) 
    }

    renderCarousel = (carousel) => {
        const posterId = carousel.postedBy
        ? `/user/${carousel.postedBy._id}`
        : "";
        
        const posterName = carousel.postedBy
        ? carousel.postedBy.name
        : " Unknown";

        const photoUrl = carousel.postedBy
        ? `${process.env.REACT_APP_API_URL}/user/photo/${
            carousel.postedBy._id
          }?${new Date().getTime()}`
        : ''

        const photoOne = carousel.photo1
        ? `${process.env.REACT_APP_API_URL}/carousel/photo/${
            carousel.photo1
          }?${new Date().getTime()}`
        : ''


        return (
            <div >
                <Carousel >
                    <Carousel.Item>
                        <img
                        style={{ height: "300px", width: "auto" }}
                        className="d-block w-100"
                        src={require("../core/SEL.jpg")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3></h3>
                        <p>We care</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{ height: "300px", width: "auto" }}
                        className="d-block w-100"
                        src={require("../core/beloved.jpg")}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>Beloved Community</h3>
                        <p>Noone gets left behind</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        style={{ height: "300px", width: "auto" }}
                        className="d-block w-100"
                        src={require("../core/diversity.jpg")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Sky is the limit</h3>
                        <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>   
            </div>      
        );
    }

    render() {
        const {carousel, redirectToHome, redirectToSignIn} = this.state
       
        if(redirectToHome) {
            return <Redirect to={`/`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                <div className='text-center'>
                    {!carousel ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Loading....</h2>
                            </div>
                            ) : (
                                this.renderCarousel(carousel)
                               
                            )
                        }
                        <div className='row' id='carol' style={{height: 'max-height'}}>
                              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                                <div className='col-md-3 ml-5 mt-5'>
                                    <h2 style={{color: 'yellow'}}>{carousel.caption1}</h2>
                                </div>
                              </Animated>
                              <div className=' col-md-9 mt-5 mb-5' style={{color: 'white'}}> {carousel.missionStatement}</div>
                            <div >
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }
                            </div>
                        </div>
                        <footer>
                        <div class="row">
                            <div className="col d-flex justify-content-between align-items-baseline">
                                <div className="footer-icons">
                                        <a href="https://www.facebook.com/itskeezy.baybe" className="mx-2"><i className="fab fa-facebook"></i>
                                        </a>
                                        <a href="https://github.com/Antkeo1" className="mx-2"><i className="fab fa-github"></i>
                                        </a>
                                        <a href="https://www.linkedin.com/in/antonio-keo-63b17b168" className="mx-2"><i className="fab fa-linkedin"></i>
                                        </a>
                                </div>
                                <h5 className="text-capitalize">
                                &copy;2019 copyright : Coder
                                </h5>
                            </div>
                            </div>
                        </footer>
                        {/* <img style={{height: '200px', marginTop: '10px'}} src={require("./community-banner.png")} /> */}

                </div>
            </div>
        )
    }
}

export default Carol
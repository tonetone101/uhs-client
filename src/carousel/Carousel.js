import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {singleCarousel, update, list} from './apiCarousel'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'

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
            <Carousel className='container mt-5'>
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
              
                
                // <div  >
                //     <p className="font-italic mark">
                        
                //         <img  style={{ height: "40px", borderRadius:'30px', width: "40px" }} className="img-thumbnail" src={photoUrl} alt='' />

                //             {posterName}{" "}
                      
                //         {new Date(carousel.created).toDateString()}
                //     </p>
                    
                //     <p className="card-text">
                //         {carousel.missionStatement}
                //     </p>
                //    <div >
                //     <img 
                //             src={`${
                //                 process.env.REACT_APP_API_URL
                //             }/carousel/photo/${carousel._id}`}
                //             alt=''
                //             onError={i =>
                //                 (i.target.src = ``)
                //             }
                //             className="img-thunbnail mb-3 ml-50"
                //             style={{height: '500px', width: '500px', objectFit: 'cover'}}
                //         />
                //    </div>

                //     <div className='d-inline-block mb-5'>
                     
                //        {isAuthenticated().user && 
                //         isAuthenticated().user.role === 'admin' &&  
                //         <React.Fragment>
                //              <Link to={`/carousel/edit/${carousel._id}`} className='btn btn-raised btn-warning ml-4 btn-sm mr-4'>
                //                 Update
                //             </Link>
                //         </React.Fragment>
                        
                //         }

                //     </div>
                // </div>
        );
    }

    render() {
        const {carousel, redirectToHome, redirectToSignIn} = this.state
        console.log(this.state.carousel)
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
                        <div className='container mt-5' style={{height: 'max-height'}}>
                              <h2>Mission Statement</h2>
                            {carousel.missionStatement}
                            <div className='text-center'>
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4'>Update</Link>
                                )
                            }
                            </div>
                        </div>
                    
                </div>
            </div>
        )
    }
}

export default Carol
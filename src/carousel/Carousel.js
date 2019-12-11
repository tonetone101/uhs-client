import React, {Component} from 'react'
import {singleCarousel} from './apiCarousel'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'

class Carousel extends Component {
    state = {
        carousel: '',
        redirectToHome: false,
        redirectToSignIn: false
    }


    componentDidMount = () => {
        const carouselId = '5df128382fa2fa8d4ec18e01'
        console.log(this.props)
        singleCarousel(carouselId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data })
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

        return (
            <Carousel className='container'>
                <Carousel.Item>
                    <img
                     style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    // src={require("./core/person.png")}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    // src={require("./core/joker.jpeg")}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{ height: "300px", width: "auto" }}
                    className="d-block w-100"
                    // src={require("./core/avatar.jpeg")}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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
        console.log(carousel)
        
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
                    
                </div>
            </div>
        )
    }
}

export default Carousel
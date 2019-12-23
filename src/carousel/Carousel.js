import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {singleCarousel, update, list} from './apiCarousel'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {Animated} from "react-animated-css"
import cookie from "react-cookies";

import { googleTranslate } from "../utils/googleTranslate";

class Carol extends Component {
    state = {
        carousel: [],
        redirectToHome: false,
        redirectToSignIn: false,
        languageCodes: [],
        language: cookie.load("language") ? cookie.load("language") : "en",
        question: cookie.load("question")
        ? cookie.load("question")
        : "What language do you prefer to read with?"
    }

    componentDidMount = () => {
        googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
          });
      
          const getLanguageCodes = languageCodes => {
            this.setState({ languageCodes });
          };
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({carousel: data.find(d => {
                    if (d._id == "5df6804c6b53ac295ad15f78") {
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
                <Carousel className='container'>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../images/logo.png")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                       
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../images/uhsProfile.png")}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                     
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../images/uhsMission.png")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../images/uhsVision.png")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>   
            </div>      
        );
    }

    render() {
        const {carousel, redirectToHome, redirectToSignIn, languageCodes, language, question } = this.state
       
        if(redirectToHome) {
            return <Redirect to={`/`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                
                <div className='text-center'>
                {
                                <div style={this.divStyle}>
                                    

                                    {/* iterate through language options to create a select box */}
                                    <select
                                    className="select-language"
                                    value={language}
                                    onChange={e => this.changeHandler(e.target.value)}
                                    >
                                    {languageCodes.map(lang => (
                                        <option key={lang.language} value={lang.language}>
                                        {lang.name}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                            }
                    {!carousel ? ( 
                            <div className='jumbotron text-center '>
                                <h2>Loading....</h2>
                            </div>
                            ) : (
                                this.renderCarousel(carousel)
                               
                            )
                        }
                    <div>    
                                        
                        <img 
                        style={{ height: "300px", width: "auto" }}
                        className=""
                        src={require("../images/uhsStat.png")}
                        alt="Second slide" 
                        
                        />
                    </div>
                        <div className=' text-center mt-5 mb-5' style={{color: 'black'}}> <div className='container'>
                            <p>{question}</p>
                        </div>
                    </div>
                            <div >
                            {
                                isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                    <Link to={`/edit/carousel/${carousel._id}`} className='text-center btn btn-primary mt-4 mb-4'>Update</Link>
                                )
                            }
                            </div>
                            <hr/>
            
                        {/* <div className='row' id='carol' style={{height: 'max-height'}}>
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
                        </div> */ }
                        <footer >
                            
                            <div class="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../images/banner.png")} /> 
                                <div className="col-md-6 d-flex justify-content-around align-items-baseline">
                                    <div >
                                        <p>123 Empire street | Providence, RI 02910</p>
                                        <p>Phone: (401) 332- 2233 | Somaly@uhSchool.org</p>
                                        <h5 className="text-capitalize">
                                        &copy;2019 copyright : Coder
                                        </h5> 
                                     </div>
                                </div>
                                </div>
                        </footer> 
                </div>
            </div>
        )
    }
    changeHandler = language => {
        let { question } = this.state;
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";
    
        const translating = transQuestion => {
          if (question !== transQuestion) {
            this.setState({ question: transQuestion });
            cookie.save("question", transQuestion, { path: "/" });
          }
        };
    
        // translate the question when selecting a different language
        if (language !== cookieLanguage) {
          googleTranslate.translate(this.state.carousel.missionStatement, language, function(err, translation) {
            transQuestion = translation.translatedText;
            translating(transQuestion);
          });
        }
    
        this.setState({ language });
        cookie.save("language", language, { path: "/" });
      };
    
      // just some inline css to center our demo
    //   divStyle = {
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //     width: "100wh"
    //   };
}

export default Carol
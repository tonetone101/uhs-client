import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {singleCarousel, update, list} from './apiCarousel'

import {Link, Redirect } from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';

class Carol extends Component {
    state = {
        user: '',
        carousel: [],
        redirectToHome: false,
        redirectToSignIn: false,
        spanishPage: false,
        englishPage: false
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
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
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true})
    }

    translateEnglish = () => {
        this.setState({englishPage: true})
    }

    
    renderTopHeader = () => {
        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="Translator"  >
                                <Dropdown.Item href="#/action-1"><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-2"><a >Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item href="#/action-3"><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item href="#/action-3"><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item href="#/action-3"><a>Portuguese</a></Dropdown.Item>
                            
                            </DropdownButton>
                        
                        {
                            !this.state.user && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/signin' style={{color: 'black'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'black'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            this.state.user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        this.props.history.push('/')
                                    })}>
                                        Sign Out
                                    </a>
                                </Nav.Link>
                            )
                        }
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }

    renderMenu = () => {
        return (
            <div>
                 <Navbar id='menu' collapseOnSelect expand="lg" variant="dark"  >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                         <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/'>Home</Link></Nav.Link>
                        </div>

                       <div id='link'>                
                           <Nav.Link href="#features"><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>
                        </div>
                        <Nav.Link href="#features"><Link style={{color: 'white'}} to='/student'>Students</Link></Nav.Link>
                        
                        
                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/admission'>Admission</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/partners'>Our Partners</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/images'>Gallery</Link></Nav.Link>
                        </div>

                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
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
                        src={require("../../images/logo.png")}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                       
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../../images/uhsProfile.png")}
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                     
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../../images/uhsMission.png")}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        // style={{ height: "350px", width: "300px" }}
                        className="d-block w-100"
                        src={require("../../images/uhsVision.png")}
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
        const {carousel, spanishPage, englishPage, redirectToSignIn } = this.state
        
        if(spanishPage) {
            return <Redirect to={`/spanish`} />
         } else if (englishPage) {
             return <Redirect to={'/'} />
         }
         
         else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         } 

        return (
            <div>
                {this.renderTopHeader()}
                {this.renderMenu()}
                <div className='text-center'>
                    
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
                        src={require("../../images/uhsStat.png")}
                        alt="Second slide" 
                        
                        />
                    </div>
                        <div className=' text-center mt-5 mb-5' style={{color: 'black'}}> <div className='container'>
                            <p>{carousel.missionStatement}</p>
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
            
                        <footer >
                            
                            <div className="container row ml-5">
                                <img className='col-md-6 mb-4' style={{height: '150px', marginTop: '10px'}} src={require("../../images/banner.png")} /> 
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
}

export default Carol
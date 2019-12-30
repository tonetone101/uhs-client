import React, { Component } from "react";
import { list, read } from "./apiPhoto";
import { Link, Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../../auth'
import { Navbar, Nav, NavDropdown, Dropdown, DropdownButton} from 'react-bootstrap';



class Photo extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            images: [],
            page: 1,
            error: '',
            spanishPage: false,
            englishPage: false
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

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.loadImages(this.state.images)
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    translateSpanish = () => {
        this.setState({spanishPage: true, englishPage: false})
    }

    translateEnglish = () => {
        this.setState({englishPage: true, spanishPage: false})
    }

    renderTopHeader = () => {
        return (
            <div>
                <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                    <DropdownButton id="dropdown-basic-button" title="Translator"  >
                                <Dropdown.Item ><a onClick={this.translateSpanish}>Spanish</a>
                                </Dropdown.Item>
                                <Dropdown.Item ><a >Cambodian</a>
                                </Dropdown.Item>
                                <Dropdown.Item><a>Hmong</a></Dropdown.Item>

                                <Dropdown.Item><a onClick={this.translateEnglish}>English</a></Dropdown.Item>

                                <Dropdown.Item><a>Portuguese</a></Dropdown.Item>
                            
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
        const { user, images, error, spanishPage, englishPage } = this.state;
        if(spanishPage) {
            return <Redirect to={`/spanish/images`} />
         } else if (englishPage) {
             return <Redirect to={'/images'} />
         } 

        return (
            <div>
                {this.renderTopHeader()}
                {this.renderMenu()}
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
            </div>
        );
    }
}

export default Photo;
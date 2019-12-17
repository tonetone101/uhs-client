import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {signout, isAuthenticated} from '../auth';
import {Link, withRouter} from 'react-router-dom'

const TopHeader = ({history}) => {
    console.log(isAuthenticated().user)

    
        return (
            <Navbar id='topHeader' collapseOnSelect expand="lg" variant="dark" >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " >
                       
                        <NavDropdown title="Translator" id="collasible-nav-dropdown" style={{color: 'black'}}>
                            <NavDropdown.Item ><a onClick={() => {
                                                    window.open('https://translate.google.com/translate?hl=en&tab=TT0&authuser=0&sl=en&tl=km&u=www.uhSchool.org', '_blank')
                                                }}>Spanish</a></NavDropdown.Item>
                            <NavDropdown.Item ><a>Arabian</a></NavDropdown.Item>
                            <NavDropdown.Item ><a onClick={() => {
                                                    window.open('https://translate.google.com/translate?hl=en&tab=TT0&authuser=0&sl=en&tl=km&u=www.uhSchool.org', '_blank')
                                                }}>Cambodian</a></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        
                        {
                            !isAuthenticated() && (
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
                            isAuthenticated() && isAuthenticated().user && (
                                <Nav.Link>
                                    <a style={{color: 'black'}}  onClick={() => signout(() => {
                                        history.push('/')
                                    })}>
                                        Sign Out
                                    </a>
                                </Nav.Link>
                            )
                        }
                      
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default withRouter(TopHeader)
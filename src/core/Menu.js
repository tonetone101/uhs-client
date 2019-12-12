import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {signout, isAuthenticated} from '../auth';
import {Link, withRouter} from 'react-router-dom'

const Menu = ({history}) => {
    console.log(isAuthenticated().user)

    
        return (
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Navbar.Brand href="#home"><Link style={{color: 'white'}} to='/'>UHS</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features"><Link style={{color: 'white'}} to='/'>Home</Link></Nav.Link>
                        <Nav.Link href="#features"><a style={{color: 'white'}}  onClick={() => {
                                                    window.open('https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduprovidenceri/seplog01.w', '_blank')
                                                }}>Skyward</a></Nav.Link>
                        <NavDropdown title="Translator" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1"><a>Spanish</a></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"><a>Arabian</a></NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Cambodian</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    <Nav>
                        <Nav.Link href="#features"><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        {
                            !isAuthenticated() && (
                               <nav className='row'>
                                <Nav.Link >
                                    <Link className='ml-3' to='/signin' style={{color: 'white'}}>
                                        Sign In 
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link style={{color: 'white'}} to='/signup' >
                                        Sign Up
                                    </Link>
                                </Nav.Link>
                               </nav>
                            )
                        }
                        
                        {
                            isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                                <Nav.Link>
                                    <a style={{color: 'white'}}  onClick={() => signout(() => {
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

export default withRouter(Menu)
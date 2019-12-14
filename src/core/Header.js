import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {signout, isAuthenticated} from '../auth';
import {Link, withRouter} from 'react-router-dom'

const Header = ({history}) => {
    console.log(isAuthenticated().user)

    
        return (
            <Navbar collapseOnSelect expand="lg" style={{height: '100px'}} variant="dark">
                <Navbar.Brand style={{marginLeft: '480px', fontSize: '50px'}}><Link style={{color: 'white'}} to='/'>University High School</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default withRouter(Header)
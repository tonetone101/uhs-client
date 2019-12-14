import React from 'react'
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {signout, isAuthenticated} from '../auth';
import {Link, withRouter} from 'react-router-dom'

const Menu = ({history}) => {
    console.log(isAuthenticated().user)

    
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{opacity: '0.5'}} >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto " className="col d-flex justify-content-around align-items-baseline">
                       <div id='link'>                
                           <Nav.Link href="#features"><Link style={{color: 'white'}} to='/faculty'>Faculty</Link></Nav.Link>
                        </div>
                        {/* <Nav.Link href="#features"><a style={{color: 'white'}}  onClick={() => {
                                                    window.open('https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduprovidenceri/seplog01.w', '_blank')
                                                }}>Skyward</a></Nav.Link> */}
                        
                        
                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/new/student'>Admission</Link></Nav.Link>
                        </div>
                        <div id='link'>                        
                            <Nav.Link href="#features"><Link style={{color: 'white'}} to='/events'>Upcoming Events</Link></Nav.Link>
                        </div>
                    
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
}

export default withRouter(Menu)
import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import Links from './Links'

class Admission extends Component {
    constructor() {
        super();
        this.state = {
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    
    render() {
        return (
            <div className='container' >
                <h3 className='text-center'>Welcome to our Admissions section</h3>
               <ul>
                   <li>
                       <Link to='/new/student'>
                            Pre-registeration
                       </Link>
                   </li>
                   
                   
               </ul>
            </div>
        );
    }
}

export default Admission;
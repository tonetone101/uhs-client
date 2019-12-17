import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { create } from "./apiStudent";
import { Redirect, Link } from "react-router-dom";
import Links from './Links'

class Student extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        };
    }

    
    render() {
        const {
            parent,
            student,
            birthday,
            contact,
            user,
            error,
            loading,
            redirectToProfile
        } = this.state;

        return (
            <div className='container' >
                <h3 className='text-center'>Welcome to our Student section</h3>
                <p className='text-center'>Below you'll find a list of content about our policies and other important links we believe will benefit our students</p>
               <ul>
                   <li>
                       <Link to='/bully'>
                            Bullying policy
                       </Link>
                   </li>

                   <li>
                       <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                            Bullying Manual 
                       </Link>
                   </li>

                   <li>
                       <Link to='/genderpolicy'>
                            Student gender policy
                       </Link>
                   </li>
                   
                   
               </ul>
               <Links />
            </div>
        );
    }
}

export default Student;
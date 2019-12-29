import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Signup from './user/SignUp'
import Signin from './user/SignIn'

import Home from './core/Home'
import Menu from './core/Menu'
import Header from './core/Header'
import TopHeader from './core/TopHeader'

// english
import NewCarousel from './english/carousel/NewCarousel'
import EditCarousel from './english/carousel/EditCarousel'
import Carol from './english/carousel/Carousel'
import NewEvent from './english/events/NewEvents'
import Event from './english/events/Events'
import EditEvent from './english/events/EditEvent'
import SingleEvent from './english/events/SingleEvent'
import NewFaculty from './english/Faculty/NewFaculty'
import Faculty from './english/Faculty/Faculty'
import SingleFaculty from './english/Faculty/SingleFaculty'
import EditFaculty from './english/Faculty/EditFaculty'
import NewStudent from './english/student/NewStudent'
import Admission from './english/student/Admission'
import Bully from './english/student/Bully'
import Student from './english/student/Student'
import GenderPolicy from './english/student/GenderPolicy'
import NewLinks from './english/student/NewLinks'
import SingleLink from './english/student/SingleLink'
import NewPhoto from './english/gallery/NewPhoto'
import Photo from './english/gallery/Photo'
import SinglePhoto from './english/gallery/SinglePhoto'
import EditPhoto from './english/gallery/EditPhoto'

// spanish
import NewSpanishCarousel from './spanish/carousel/NewCarousel'
import EditSpanishCarousel from './spanish/carousel/EditCarousel'
import CarolSpanish from './spanish/carousel/Carousel'
import NewSpanishEvent from './spanish/events/NewEvents'
import EventSpanish from './spanish/events/Events'
import EditSpanishEvent from './spanish/events/EditEvent'
import SingleSpanishEvent from './spanish/events/SingleEvent'
import NewSpanishFaculty from './spanish/Faculty/NewFaculty'
import FacultySpanish from './spanish/Faculty/Faculty'
import SingleSpanishFaculty from './spanish/Faculty/SingleFaculty'
import EditSpanishFaculty from './spanish/Faculty/EditFaculty'
import NewSpanishStudent from './spanish/student/NewStudent'
import AdmissionSpanish from './spanish/student/Admission'
import BullySpanish from './spanish/student/Bully'
import StudentSpanish from './spanish/student/Student'
import GenderSpanishPolicy from './spanish/student/GenderPolicy'
import NewSpanishLinks from './spanish/student/NewLinks'
import SingleSpanishLink from './spanish/student/SingleLink'
import NewSpanishPhoto from './spanish/gallery/NewPhoto'
import PhotoSpanish from './spanish/gallery/Photo'
import SingleSpanishPhoto from './spanish/gallery/SinglePhoto'
import EditSpanishPhoto from './spanish/gallery/EditPhoto'

const MainRouter = () => (
    <div >
        {/* <TopHeader/> */}
        {/* <Menu /> */}
        <Switch>
            {
            //english          
            }
            <Route exact path="/" component={Carol}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            
            <Route exact path="/new/carousel" component={NewCarousel}></Route>
            <Route exact path="/edit/carousel/:carouselId" component={EditCarousel}></Route>
            <Route exact path="/events" component={Event}></Route>
            <Route exact path="/new/event" component={NewEvent}></Route>
            <Route exact path="/edit/event/:eventId" component={EditEvent}></Route>
            <Route exact path="/event/:eventId" component={SingleEvent}></Route>
            <Route exact path="/new/faculty" component={NewFaculty}></Route>
            <Route exact path="/faculty" component={Faculty}></Route>
            <Route exact path="/faculty/:facultyId" component={SingleFaculty}></Route>
            <Route exact path="/edit/faculty/:facultyId" component={EditFaculty}></Route>
            <Route exact path="/new/student" component={NewStudent}></Route>
            <Route exact path="/admission" component={Admission}></Route>
            <Route exact path="/bully" component={Bully}></Route>
            <Route exact path="/student" component={Student}></Route>
            <Route exact path="/genderpolicy" component={GenderPolicy}></Route>
            <Route exact path="/newlink" component={NewLinks}></Route>
            <Route exact path="/link/:linkId" component={SingleLink}></Route>
            <Route exact path="/new/image" component={NewPhoto}></Route>
            <Route exact path="/images" component={Photo}></Route>
            <Route exact path="/image/:imageId" component={SinglePhoto}></Route>
            <Route exact path="/edit/image/:imageId" component={EditPhoto}></Route>

            {
            // spanish          
            }
            <Route exact path="/spanish" component={CarolSpanish}></Route>
            <Route exact path="/spanish/new/carousel" component={NewSpanishCarousel}></Route>
            <Route exact path="/spanish/edit/carousel/:carouselId" component={EditSpanishCarousel}></Route>
            <Route exact path="/events" component={EventSpanish}></Route>
            <Route exact path="/spanish/new/event" component={NewSpanishEvent}></Route>
            <Route exact path="/spanish/edit/event/:eventId" component={EditSpanishEvent}></Route>
            <Route exact path="/spanish/event/:eventId" component={SingleSpanishEvent}></Route>
            <Route exact path="/spanish/new/faculty" component={NewSpanishFaculty}></Route>
            <Route exact path="/spanish/faculty" component={FacultySpanish}></Route>
            <Route exact path="/spanish/faculty/:facultyId" component={SingleSpanishFaculty}></Route>
            <Route exact path="/spanish/edit/faculty/:facultyId" component={EditSpanishFaculty}></Route>
            <Route exact path="/spanish/new/student" component={NewSpanishStudent}></Route>
            <Route exact path="/spanish/admission" component={AdmissionSpanish}></Route>
            <Route exact path="/spanish/bully" component={BullySpanish}></Route>
            <Route exact path="/spanish/student" component={StudentSpanish}></Route>
            <Route exact path="/spanish/genderpolicy" component={GenderSpanishPolicy}></Route>
            <Route exact path="/spanish/newlink" component={NewSpanishLinks}></Route>
            <Route exact path="/spanish/link/:linkId" component={SingleSpanishLink}></Route>
            <Route exact path="/spanish/new/image" component={NewSpanishPhoto}></Route>
            <Route exact path="/spanish/images" component={PhotoSpanish}></Route>
            <Route exact path="/spanish/image/:imageId" component={SingleSpanishPhoto}></Route>
            <Route exact path="/spanish/edit/image/:imageId" component={EditSpanishPhoto}></Route>


        </Switch>
        
    </div>
)

export default MainRouter;
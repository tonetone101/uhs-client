import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './core/Home'
import Menu from './core/Menu'
import Signup from './user/SignUp'
import Signin from './user/SignIn'

import NewCarousel from './carousel/NewCarousel'
import EditCarousel from './carousel/EditCarousel'
import Carol from './carousel/Carousel'

import NewEvent from './events/NewEvents'
import Event from './events/Events'
import EditEvent from './events/EditEvent'
import SingleEvent from './events/SingleEvent'



const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Carol}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>

            <Route exact path="/new/carousel" component={NewCarousel}></Route>
            <Route exact path="/edit/carousel/:carouselId" component={EditCarousel}></Route>
            
            <Route exact path="/events" component={Event}></Route>
            <Route exact path="/new/event" component={NewEvent}></Route>
            <Route exact path="/edit/event/:eventId" component={EditEvent}></Route>
            <Route exact path="/event/:eventId" component={SingleEvent}></Route>

        </Switch>
        
    </div>
)

export default MainRouter;
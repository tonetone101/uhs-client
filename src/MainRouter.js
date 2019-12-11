import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from './core/Home'
import Menu from './core/Menu'
import Signup from './user/SignUp'
import Signin from './user/SignIn'

import NewCarousel from './carousel/NewCarousel'


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>

            <Route exact path="/new/carousel" component={NewCarousel}></Route>

        </Switch>
    </div>
)

export default MainRouter;
import React, {Component} from 'react'
import {singleFaculty, remove} from './apiFaculty'
import {Link, Redirect} from 'react-router-dom'
import {isAuthenticated} from '../../auth'


class SingleFaculty extends Component {
    state = {
        faculty: '',
        redirectToFaculties: false,
        redirectToSignIn: false,
    }

    componentDidMount = () => {
        const facultyId = this.props.match.params.facultyId
        singleFaculty(facultyId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({faculty: data})
            }
        }) 
    }

    deleteFaculty = () => {
        const facultyId = this.props.match.params.facultyId
        const token = isAuthenticated().token
        remove(facultyId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToFaculties: true})
            }
        })
    }

    deleteConfirm = () => {
        let answer = window.confirm('Are you sure you want to delete your post?')
        if(answer) {
            this.deleteFaculty()
        }
    }

    renderFaculty = (faculty) => {
        const posterId = faculty.postedBy
        ? `/user/${faculty.postedBy._id}`
        : "";
        
        const posterName = faculty.postedBy
        ? faculty.postedBy.name
        : " Unknown";

        const photoUrl = faculty._id
        ? `${process.env.REACT_APP_API_URL}/faculty/photo/${
            faculty._id
          }?${new Date().getTime()}`
        : '';

        return (
                <div  className='row'>
                     <div className='col-md-6 mt-5'>
                        <img 
                            src={photoUrl}
                            alt=''
                            onError={i =>
                                (i.target.src = ``)
                            }
                            className="img-thunbnail mb-3 ml-50"
                            style={{height: '500px', width: '500px', objectFit: 'cover', borderRadius: '10px'}}
                        />
                   </div>

                    <div className='col-md-6 mt-5'>
                        <p className="card-text">
                            Faculty Title: {faculty.title}
                        </p>
                        <p className="card-text">
                            Name: {faculty.name}
                        </p>
                        <p className="card-text">
                            About: {faculty.about}
                        </p>
                    </div>

                    <div className='row'>
                        <Link
                            to={`/faculty`}
                            className="btn btn-raised btn-primary btn-sm "
                            style={{marginLeft: '30px'}}
                        >
                            Back to faculties
                        </Link>

                        {isAuthenticated().user && isAuthenticated().user.role === 'admin' && (
                            <div >
                                <div >
                                    <Link
                                        to={`/edit/faculty/${faculty._id}`}
                                        className='btn btn-raised btn-warning ml-3'
                                    >
                                        Update Faculty
                                    </Link>
                                    <button
                                        onClick={this.deleteConfirm}
                                        className='btn btn-raised btn-danger ml-3'
                                    >
                                        Delete 
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
        );
    }

    render() {
        const {faculty, redirectToFaculties, redirectToSignIn} = this.state
        
        if(redirectToFaculties) {
            return <Redirect to={`/faculty`} />
         } else if(redirectToSignIn) {
            return <Redirect to={`/signin`} />
         }

        return (
            <div>
                           <div className='container'>
                                {!faculty ? ( 
                                        <div className='jumbotron text-center '>
                                            <h2>Loading....</h2>
                                        </div>
                                        ) : (
                                            this.renderFaculty(faculty)
                                        )
                                    }
                               
                            </div>
            </div>
        )
    }
}

export default SingleFaculty
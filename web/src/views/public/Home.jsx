import React, { useState, useEffect} from 'react';
import  { FaTwitter, FaFacebook, FaInstagram, FaCog } from 'react-icons/fa';
import ReviewsService from '../../services/reviews.service';
import AppNotification from '../../shared/appNotification';
import * as F from '../../utils/formatters';



const reviewsService = new ReviewsService();

const initialValues = {
    email:'',
    description:''
};

export const Home = (props)=> {

    const [reviewForm, setReviewForm] = useState(initialValues);

    const [allReviews, setAllReviews] = useState([]); // allReviews getter/setter
    
    const [loaders, setLoaders] = useState({
        fetching:false,
        saving:false
    });

    useEffect(()=>{ // component did mount
        getAllReviews();
    },[])


    // binds form input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setReviewForm({...reviewForm, [name]:value });
    }


    // this method retrieves all reviews and filters approved  ones
    const getAllReviews = async()=>{
        setLoaders({...loaders, fetching:true});
        reviewsService.getAllReviews().then((reviewResponse)=>{
            setAllReviews(reviewResponse.filter(r => r.status == 2)); // retrieve only approved 
            setLoaders({...loaders, fetching:false});
            console.log('REVEVEVE', reviewResponse.filter(r => r.status == 0))
        }).catch((error)=>{
            setLoaders({...loaders, fetching:false});
            new AppNotification({
                msg:F.processErrors(error),
                type:'error'
            })
        })
    }

    //submits a review
    const submitReview = async (event) => {
        event.preventDefault(); // prevent page reload
        if(!F.isValid(reviewForm)) return alert('Invalid!');
        setLoaders({...loaders, saving:true});
        reviewsService.createReview(reviewForm).then((reviewResponse)=>{
        setLoaders({...loaders, saving:false});
            new AppNotification({
                msg:'Review successfully submitted!',
                type:'success'
            })
            setReviewForm(initialValues);
        }).catch((error)=>{
        setLoaders({...loaders, saving:false});
            new AppNotification({
                msg:F.processErrors(error),
                type:'error'
            })
        })
    }


    return (
        <>
        <div className="overlay"></div>
            <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                <source src="./assets/mp4/bg.mp4" type="video/mp4" />
            </video>

            <div className="masthead">
                <div className="masthead-bg"></div>
                <div className="container h-100">
                <div className="row h-100">
                    <div className="col-12 my-auto">
                    <div className="masthead-content text-white py-5 py-md-0">
                        <div className='float-right'>
                            <a className='btn btn-secondary mt-3' href='dashboard'>Login</a>
                        </div>
                        <h1 className="mb-3">Bimbi Org!</h1>
                        <p className="mb-5">Now that you have come, please provide a brief review.</p>
                        <div className="form-group">
                            <form onSubmit={submitReview}>
                                <div>
                                <textarea name='description'  value={reviewForm.description || ''} onChange={handleChange}  className='form-control mb-2' rows='15'/>
                                <div className="input-group input-group-newsletter">
                                    <input type="email" className="form-control" name='email' onChange={handleChange} value={reviewForm.email} placeholder="Enter your email" aria-label="Enter your email..." aria-describedby="submit-button"/>
                                    <div className="input-group-append">
                                        <button disabled={!F.isValid(reviewForm)} className="btn btn-secondary" type="submit" id="submit-button">Submit review 
                                        {
                                          loaders?.saving ?  <FaCog className='spin'/> : null
                                        }
                                        </button>
                                    </div>
                                </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                    </div>
                </div>
       
                </div>
            </div>

            <div className='row'>
                {
                    allReviews.length ? allReviews.map((review)=>{
                        
                        return(
                            <div className='card col-md-3' key={review?._id}>
                                <div className='card-header'>
                                <em>By: {review?.email} on {F.formatDate(review?.created_at)}</em>
                                </div>
                                <div className='card-body'>
                                <em>By: {review?.description}</em>
                                </div>
                            </div>
                        )


                    }):null
                }
                </div>
          
            <div className="social-icons">
                <ul className="list-unstyled text-center mb-0">
                <li className="list-unstyled-item">
                    <a href="#">
                        <FaTwitter/>
                    </a>
                </li>
                <li className="list-unstyled-item">
                    <a href="#">
                        <FaFacebook/>
                    </a>
                </li>
                <li className="list-unstyled-item">
                    <a href="#">
                    <FaInstagram/>
                    </a>
                </li>
                </ul>
            </div>
        
        </>
    )
}

export default Home;
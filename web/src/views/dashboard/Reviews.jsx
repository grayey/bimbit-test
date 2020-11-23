import React, { Component} from 'react';
import { FaQuestion, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import ReviewsService  from '../../services/reviews.service';
import * as F from '../../utils/formatters';
import AppNotification from '../../shared/appNotification';

class ReviewsComponent extends Component {

    reviewsService;

    constructor(props){
        super(props);
        this.reviewsService = new ReviewsService();
    }

    state = {
        allReviews:[],
        loaders:{
            fetching:false,
            saving:false
        },
        viewedReview:{},
        showApprovalAlert:false,
        showRejectionAlert:false,
        confirmation:0,
    }

    componentDidMount = async ()=> {
        this.getAllReviews();
    }

    setStatus = (review) =>{
        const { status } = review; // status can be 0, 1 or 2 
        const options = {
            '0':{
                label:'Not validated',
                variant:'secondary',
                icon:<FaQuestion/>
            },
            '1':{
                label:'Approved',
                variant:'success',
                icon:<FaCheck/>
            },
            '2':{
                label:'Rejected',
                variant:'danger',
                icon:<FaTimes/>
            },

        }
        const { label, variant, icon } = options[status.toString()] 

    return <span className={`badge badge-${variant}`}>{label} {icon}</span>;
    }

    // This prompts for confirmation, triggering an approval or rejection pop-up (Swal in this case)
    confirmApproval = (review, action = 1) =>{
        let { viewedReview, allReviews, showApprovalAlert, showRejectionAlert  } = this.state;
        viewedReview = allReviews.find(r => r._id == review._id);
        showApprovalAlert = action == 1;
        showRejectionAlert = !showApprovalAlert;
        this.setState({viewedReview, showApprovalAlert, showRejectionAlert, confirmation:action})
    }


    // This method retrieves all reviews
    getAllReviews = async () =>{
        let { allReviews, loaders } = this.state;
        loaders = {...loaders, fetching:true};
        this.setState({ loaders });
        this.reviewsService.getAllReviews().then((reviewsResponse)=>{
            allReviews = reviewsResponse;
            this.setState({loaders: {...loaders, fetching:false }, allReviews });

        }).catch((error)=>{
            this.setState({loaders: {...loaders, fetching:false } });
            new AppNotification({
                msg:F.processErrors(error),
                type:'error'
            })
        })

    }


    // this submits admins confirmation, i.e, Approval or rejection
    submitConfirmation = async () => {
        let { viewedReview, loaders, confirmation, allReviews } = this.state;
        const action = confirmation == 1 ? 'Approved':'Rejected';
        const { _id } = viewedReview;
        loaders = {...loaders, saving:true};
        this.setState({ loaders });
        this.reviewsService.updateReview({...viewedReview, status:confirmation}, _id).then(
           async (confirmationResponse)=>{
                const viewedReviewIndex = allReviews.findIndex(r => r._id == confirmationResponse._id); //find position
         await  allReviews.splice(viewedReviewIndex, 1, confirmationResponse); //replace at position
                this.setState({ allReviews, loaders: {...loaders, saving:false } });
                new AppNotification({
                    msg: `Review ${action}!`,
                    type:'success'
                })
            }).then((error)=>{
                this.setState({loaders: {...loaders, saving:false } });
                new AppNotification({
                    msg:F.processErrors(error),
                    type:'error'
                })
            })
    }


    render(){

        const { allReviews, loaders } = this.state;
        const { fetching } = loaders;
    
        return(
            <div className="card">
                <div className="card-header">Reviews</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allReviews.length ? allReviews.map((review, index)=> {
                                        const {  status } = review;
                                        return (
                                            <tr key={review?._id}>
                                                <td>
                                                <b>{index+1}.</b>
                                                </td>
                                                <td>
                                                    {review?.email}
                                                </td>
                                                <td>
                                                {review?.description}
                                                </td>
                                                <td>
                                                    {this.setStatus(review)}
                                                </td>
                                                <td>
                                                {F.formatDate(review.created_at)}
                                                </td>
                                                <td>
                                                    <div className='btn-group'>
                                                        {
                                                            status !== 1 ? (
                                                            <button className='btn btn-success btn-sm'
                                                            onClick={()=>this.confirmApproval(review, 1)}>
                                                                Approve
                                                            </button>
                                                            ) : null
                                                        }
                                                        {
                                                            status !==2 ? (
                                                            <button className='btn btn-danger btn-sm' onClick={()=>this.confirmApproval(review, 2)}>
                                                                Reject
                                                            </button>
                                                            ) : null
                                                        }
                                                   
                
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }):(
                                        <>
                                        <tr>
                                            <td colSpan='6' className='text-center'>
                                                {
                                                    fetching ? (
                                                        <FaSpinner className='spin'/>
                                                    ):
                                                    (
                                                        <div>No reviews found</div>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                        </>
                                    )
                                }
                              
                            </tbody>

                        </table>

                    </div>
                </div>
              
            </div>
        )
    }

}


export default ReviewsComponent;
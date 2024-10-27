import React, {useEffect, useRef, useState} from "react";
import '../styles/tour-details.css';
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import tourData from '../data/tours';
import calculateAvgRating from '../utils/avgRating';
import avatar from '../images/avatar.jpg';
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";
import axios from  'axios'

const ToursDetails=()=>{

    const {id} = useParams();
    const reviewMsgRef = useRef('');
    const [tourRating, setTourRating] = useState(null)
    const  [singleTour,setSingleTour]= useState({})

    useEffect(()=>{
        const fetchData =async ()=>{
            try {
                console.log("fetch runing ")
                const response = await axios.get(`http://localhost:4000/api/v1/tours/${id}`)
                console.log(response.data)
                setSingleTour(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[id])   
    
    const tour = tourData.find(tour => tour.id === id);

    // // Check if tour is found
    // if (!tour) {
    //     return <h4 className="text-center pt-5">Tour not found</h4>; // Or a loading spinner
    // }

    const {photo, title, desc, price, address, reviews, city, distance, maxGroupSize}= singleTour.data;

    const {totalRating, avgRating} = calculateAvgRating(reviews)

    //format date
    const options = {day: 'numeric', month:'long', year: 'numeric'};

    //submit request to the server
    const submitHandler = e =>{
        e.preventDefault()
        const reviewText = reviewMsgRef.current.value;
       

        //later will cal our api
    }

    return(
        <>
        http
        <section>
            <Container>
                <Row>
                    <Col lg='8'>
                        <div className="tour__content">
                            <img src={photo} alt=""/>

                            <div className="tour__info">
                                <h2>{title}</h2>

                                <div className="d-flex align-items-center gap-5">

                                <span className="tour__rating d-flex align-items-center gap-1">
                                    <i 
                                        class="ri-star-smile-fill" 
                                        style={{'color':"var(--secondary-color)"}}
                                        ></i>
                                    {avgRating === 0 ? null : avgRating}
                                    {totalRating === 0 ? (
                                    'Not rated' 
                                    ) : (
                                    <span>({reviews ?.length})</span>
                                    )}
                                    
                                    
                                </span>

                                    <span>
                                        <i class="ri-map-pin-fill">
                                        </i> {address}
                                    </span>


                               </div>

                               <div className="tour__extra-details">
                                <span><i class="ri-map-pin-2-line"></i> {city}</span>
                                <span><i class="ri-money-dollar-circle-line"></i> ${price} / </span>
                                <span><i class="ri-map-pin-time-line"></i> {distance} k/m</span>
                                <span><i class="ri-group-line"></i> {maxGroupSize} people</span>

                               </div>
                               <h5>Description</h5>
                               <p>{desc}</p>
                            </div>

                            {/* ---------------tour reviews--------------- */}
                            <div className="tour__reviews mt-4">
                                    <h4>Reviews({reviews ?.length} reviews)</h4>

                                    <Form onSubmit={submitHandler}>
                                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                                            <span onClick={()=> setTourRating(1)}> 1 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={()=> setTourRating(2)}> 2 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={()=> setTourRating(3)}> 3 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={()=> setTourRating(4)}> 4 <i class="ri-star-s-fill"></i></span>
                                            <span onClick={()=> setTourRating(5)}> 5 <i class="ri-star-s-fill"></i></span>

                                        </div>
                                        <div className="review__input">
                                            <input type="text" ref={reviewMsgRef} placeholder="share your thoughts" required/>
                                            <button className="btn primary__btn text-white" type="submit" >Submit</button>
                                        </div>
                                    </Form>


                                    <ListGroup className="user__reviews">
                                        {
                                            reviews?.map(review=>(
                                                <div className="review__item">
                                                    <img src={avatar} alt="avatar"/>

                                                    <div className="w-100">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div>
                                                                <h5>Ayushi</h5>
                                                                <p>{new Date('06-12-2024').toLocaleDateString("en-US", options)}</p>
                                                            </div>
                                                            <span className="d-flex align-items-center">5 <i class="ri-star-s-fill"></i></span>
                                                        </div>
                                                        <h6>Amazing tour</h6>
                                                    </div>
                                                </div>
                                            ))
                                        }

                                    </ListGroup>
                            </div>
                        </div>
                    </Col>

                    <Col lg='4'>
                        <Booking tour={tour} avgRating={avgRating}/>
                    </Col>
                </Row>
            </Container>
        </section>
       <Newsletter/>
        </>
    )
}
export default ToursDetails;
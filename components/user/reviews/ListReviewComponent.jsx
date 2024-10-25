"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import FromReviewComponent from '@/components/user/reviews/FromReviewComponent';

export default function ListReviewComponent({ data, id }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const [reviewsData, setReviewsData] = useState(data);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${id}`);
            const result = await response.json();
            setReviewsData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleAddReview = (reviewId) => {
        setSelectedReviewId(reviewId);
        onOpen();
    };

    const handleCloseModal = async () => {
        setSelectedReviewId(null);
        onOpenChange(false);
        await fetchData();
    };

    return (
        <div className="flex-1 bg-gradient-to-tr from-blue-800 to-purple-700 p-9">
            <div className="bg-white h-full w-full rounded-2xl p-10 shadow-md">
                <div className="text-3xl font-semibold border-b border-gray-300 pb-4 mb-6">
                    <span>
                        <FontAwesomeIcon icon={faStar} className="h-10 w-10" /> Review
                    </span>
                </div>

                {reviewsData && reviewsData.length > 0 ? (
                    reviewsData.map((review) => (
                        <div key={review.id} className="flex flex-col lg:flex-row gap-6 bg-gray-50 p-6 rounded-xl shadow-md mb-6">
                            <div className="lg:w-1/3 p-4 border-r">
                                <div className='flex justify-between'>
                                    <h3 className="text-xl font-bold mb-2">Review Details</h3>
                                    {!review.rating && <Button onPress={() => handleAddReview(review.id)} color="primary" auto>Review</Button>}
                                </div>

                                <p><strong>Rating:</strong> {review.rating ? review.rating : 'Not rated yet'}</p>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, index) => (
                                        <FontAwesomeIcon key={index} icon={faStar} className={index < (review.rating || 0) ? 'text-yellow-500' : 'text-gray-300'} />
                                    ))}
                                </div>
                                <p><strong>Comment:</strong> {review.comment ? review.comment : 'No comments yet'}</p>
                            </div>

                            <div className="lg:w-1/3 p-4 border-r">
                                <h3 className="text-xl font-bold mb-2">Job Information</h3>
                                <p><strong>Job Title:</strong> {review.job_title}</p>
                                <p><strong>Job Type:</strong> {review.job_type}</p>
                                <p><strong>Problem Description:</strong> {review.job_description}</p>
                                <p><strong>Created At:</strong> {review.created_at}</p>
                            </div>

                            <div className="lg:w-1/3 p-4">
                                <h3 className="text-xl font-bold mb-2">Images</h3>
                                <div className="mt-4 overflow-x-auto flex gap-4 scroll-container">
                                    {JSON.parse(review.img_description).map((img, index) => (
                                        <img key={index} src={`${process.env.NEXT_PUBLIC_BASE_API}/img/${img}`} alt="Job Description Image" className="h-24 w-24 object-cover rounded-lg" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}

                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                >
                    <ModalContent>
                        <FromReviewComponent onClose={handleCloseModal} reviewId={selectedReviewId} />
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}

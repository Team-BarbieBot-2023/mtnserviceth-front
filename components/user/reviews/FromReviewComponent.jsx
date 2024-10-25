"use client";
import React, { useState } from 'react';
import { Modal, Button, Input, Textarea, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function FromReviewComponent({ onClose, reviewId }) {
    const [rating, setRating] = useState(1);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("ไม่ระบุ");

    const handleSave = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/review/${reviewId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: rating,
                    comment: comment,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error updating review: ${response.statusText}`);
            }

            onClose();
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };


    const handleRating = (rate) => {
        setRating(rate);
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">
                Rate and explain further.
            </ModalHeader>
            <ModalBody>
                <div className="flex items-center gap-2 mt-4">
                    <label className="font-semibold">Rating:</label>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={faStar}
                                className={`h-6 w-6 cursor-pointer ${index < (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                                onClick={() => handleRating(index + 1)}
                                onMouseEnter={() => setHoverRating(index + 1)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        ))}
                    </div>
                </div>

                <Textarea label="Comment" placeholder="Add any additional comments" fullWidth rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onPress={handleSave}>Save</Button>
                <Button color="danger" variant="light" onPress={onClose}>Close</Button>
            </ModalFooter>
        </>
    );
}

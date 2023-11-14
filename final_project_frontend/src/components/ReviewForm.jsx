import { useState, useEffect } from "react";
import styled from "styled-components";

const ReviewArea = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const ReviewHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewInput = styled.textarea`
  width: 100px;
  height: 50px;
  resize: none;
  padding: 50px 50px;
  border: 1px solid #ccc;
`;

const SubmitReviewButton = styled.button`
  background-color: #050505;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      rating,
      review_text: reviewText,
      user: localStorage.getItem("user_id"),
      show: localStorage.getItem("shows_id"),
    };

    const reviewResponse = await fetch("http://127.0.0.1:8000/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });

    if (reviewResponse.ok) {
      // Fetch reviews again to include the new review
      const reviewsResponse = await fetch("http://127.0.0.1:8000/reviews/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      const reviewsData = await reviewsResponse.json();
      onSubmit(reviewsData);
    } else {
      // Handle error case
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" value={rating} onChange={handleRatingChange} />
      </label>
      <label>
        Review Text:
        <textarea value={reviewText} onChange={handleReviewTextChange} />
      </label>
      <SubmitReviewButton type="submit">Submit Review</SubmitReviewButton>
    </form>
  );
};

const ReviewSection = ({ setReviews }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviewsState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await fetch("http://127.0.0.1:8000/reviews/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        });

        const reviewsData = await reviewsResponse.json();
        if (reviewsResponse.ok) {
          setReviewsState(reviewsData);
        } else {
          // Handle error case
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReviewSubmit = (newReviews) => {
    setReviews(newReviews);
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return <ReviewForm onSubmit={handleReviewSubmit} />;
};

export default ReviewSection;

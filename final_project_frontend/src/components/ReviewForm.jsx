import { useState, useEffect, useRef } from "react";
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

const ReviewForm = ({ onSubmit, reviews, setReviews }) => {
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [show, setShow] = useState("");
  const [allShows, setAllShows] = useState([]);
  const ref = useRef();

  const handleRatingChange = (event) => {
    event.preventDefault();
    setRating(event.target.value);
  };

  const handleReviewTextChange = (event) => {
    event.preventDefault();
    setReviewText(event.target.value);
  };

  const handleSelectChange = (event) => {
    event.preventDefault();
    setShow(event.target.value);
  };

  const showStuff = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/shows/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching shows");
      }

      const showsData = await response.json();
      return showsData;
    } catch (error) {
      console.error("Error fetching shows:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const showsData = await showStuff();
      setAllShows(showsData);
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log({ event });
    console.log(ref.current);
    const formData = new FormData(ref.current);
    console.log({ formData });
    console.log(formData.entries());
    formData.append("user", localStorage.getItem("user_id"));
    const payload = {
      rating,
      review_text: reviewText,
      user: localStorage.getItem("user_id"),
      show: show.title,
    };

    const reviewResponse = await fetch("http://127.0.0.1:8000/reviews/", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
      body: formData,
    });
    if (!reviewResponse.ok) {
      throw new Error("Error");
    }

    const reviewsData = await reviewResponse.json();

    // console.log("New Review Data:", reviewsData);

    setReviews(...reviews, reviewsData);
    setShow("");
    setRating("");
    setReviewText("");
  };
  return (
    <form ref={ref} onSubmit={handleSubmit}>
      <label>
        Show:
        <select>
          <option>Select a show</option>
          {allShows.map((show) => (
            <option name="show" key={show.id}>
              {show.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Rating:
        <input name="rating" type="number" />
      </label>
      <label>
        Review Text:
        <textarea
          name="review_text"
          rows={1}
          type="text"
          // value={reviewText}
          // onChange={handleReviewTextChange}
        />
      </label>
      <SubmitReviewButton type="submit">Submit Review</SubmitReviewButton>
    </form>
  );
};

const ReviewSection = ({ setReviews }) => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviewsState] = useState([]);
  const [newReview, setNewReview] = useState({});

  const fetchReviews = async () => {
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchReviews();
    };

    fetchData();
  }, [reviews]);

  const handleReviewSubmit = async (newReviews) => {
    setNewReview(newReviews);
    await fetchReviews();
    setReviews(newReviews);
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const deleteResponse = await fetch(
        `http://127.0.0.1:8000/reviews/${reviewId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Error deleting review");
      }

      // Remove the deleted review from the state
      setReviewsState((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div>
      <ReviewForm
        reviews={reviews}
        setReviews={setReviews}
        onSubmit={handleReviewSubmit}
      />
      <ReviewArea>
        <ReviewHeading>Reviews</ReviewHeading>
        {reviews.map((review) => (
          <div key={review.id}>
            {/* {console.log(reviews)} */}
            <p>User: {review.user}</p>
            <p>Title: {review.show}</p>
            <p>Rating: {review.rating}</p>
            <p>Review Text: {review.review_text}</p>
            <button onClick={() => handleDeleteReview(review.id)}>
              Delete Review
            </button>
          </div>
        ))}
      </ReviewArea>
    </div>
  );
};

export default ReviewSection;

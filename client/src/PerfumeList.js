import React, { useEffect, useState } from "react";
import { getPerfumes, postReview } from "./api";
import { useAuth } from "./context/AuthContext";

function PerfumeList() {
  const { user } = useAuth(); // ✅ Get the current user
  const [perfumes, setPerfumes] = useState([]);
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5); // Default rating

  useEffect(() => {
    getPerfumes()
      .then((res) => setPerfumes(res.data))
      .catch((err) => console.error("Failed to fetch perfumes:", err));
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }

    postReview({
      perfume_id: selectedPerfumeId,
      comment: reviewText,
      rating: parseInt(rating),
    })
      .then(() => {
        setReviewText("");
        setRating(5);
        setSelectedPerfumeId(null);
        alert("Review submitted successfully!");
      })
      .catch((err) => {
        console.error("Failed to submit review:", err);
        alert("Failed to submit review.");
      });
  };

  return (
    <div className="main-card">
      <h2>Available Perfumes</h2>
      {perfumes.length === 0 ? (
        <p>No perfumes found.</p>
      ) : (
        <ul className="perfume-list">
          {perfumes.map((perfume) => (
            <li className="perfume-card" key={perfume.id}>
              <div className="image-wrapper">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="perfume-image"
                />
              </div>
              <strong className="perfume-name">{perfume.name}</strong>
              <p className="perfume-brand">{perfume.brand}</p>

              {user && (
                <button
                  onClick={() =>
                    setSelectedPerfumeId(
                      selectedPerfumeId === perfume.id ? null : perfume.id
                    )
                  }
                >
                  {selectedPerfumeId === perfume.id ? "Cancel" : "Review"}
                </button>
              )}

              {!user && <p style={{ color: "red" }}>Login to write a review.</p>}

              {selectedPerfumeId === perfume.id && user && (
                <form
                  onSubmit={handleReviewSubmit}
                  style={{ marginTop: "1rem" }}
                >
                  <label>
                    Rating:{" "}
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    >
                      <option value={5}>5 - Excellent</option>
                      <option value={4}>4 - Good</option>
                      <option value={3}>3 - Average</option>
                      <option value={2}>2 - Poor</option>
                      <option value={1}>1 - Terrible</option>
                    </select>
                  </label>
                  <br />
                  <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={3}
                    required
                  />
                  <br />
                  <button type="submit">Submit Review</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PerfumeList;

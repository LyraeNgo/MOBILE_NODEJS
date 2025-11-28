export default class Review {
  constructor({
    review_id,
    user_id,
    event_id,
    rating,
    comment,
    created_at,
    updated_at,
  }) {
    this.reviewId = review_id;
    this.userId = user_id;
    this.eventId = event_id;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}

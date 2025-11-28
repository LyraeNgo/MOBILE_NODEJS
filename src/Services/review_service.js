import {
  createReviewRepo,
  getReviewByIdRepo,
  getReviewsByEventRepo,
  updateReviewRepo,
  deleteReviewRepo,
} from "../Repositories/review_repository.js";

import { serviceGetTicketsByUser } from "../Services/ticket_service.js";

export const serviceCreateReview = async (userId, eventId, rating, comment) => {
  // 1. Check user đã mua vé
  const tickets = await serviceGetTicketsByUser(userId, eventId);
  if (!tickets.length) {
    throw new Error("User has not purchased a ticket for this event.");
  }

  // 2. Không cho review nhiều lần
  const existingReviews = await getReviewsByEventRepo(eventId);
  const alreadyReviewed = existingReviews.find((r) => r.userId === userId);

  if (alreadyReviewed) {
    throw new Error("User already submitted a review for this event.");
  }

  return await createReviewRepo(userId, eventId, rating, comment);
};

export const serviceGetEventReviews = async (eventId) => {
  return await getReviewsByEventRepo(eventId);
};

export const serviceUpdateReview = async (
  reviewId,
  userId,
  rating,
  comment
) => {
  const review = await getReviewByIdRepo(reviewId);
  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.userId !== userId) {
    throw new Error("Not authorized to update this review.");
  }

  return await updateReviewRepo(reviewId, rating, comment);
};

export const serviceDeleteReview = async (reviewId, userId) => {
  const review = await getReviewByIdRepo(reviewId);
  if (!review) {
    throw new Error("Review not found.");
  }

  if (review.userId !== userId) {
    throw new Error("Not authorized to delete this review.");
  }

  return await deleteReviewRepo(reviewId);
};

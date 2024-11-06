import { prisma } from "../db.config.js";

export const addReview = async (data) => {
    const store = await prisma.store.findFirst({where: {data: data.store_id}});
    
    const created = await prisma.store.create({data: data});
    return result.created.store_id;
};

export const getReviewById = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({where: {review_id: reviewId}})
    return review;
}
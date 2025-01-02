import { Review, User, Store } from "@prisma/client";
import { prisma } from "../db.config.js";

// 가게 리뷰 작성 기능
export const addReview = async (data: {
  userId: number;
  storeId: number;
  title: string;
  content: string;
  score: number;
  image: string;
}): Promise<number | null> => {
  const stores = await prisma.store.findFirst({where: {id: data.storeId}});
  if (!stores) {
    return null;
  }
  
  const created = await prisma.review.create({
    data: {
      userId: data.userId,
      storeId: data.storeId,
      title: data.title,
      content: data.content,
      score: data.score,
      image: data.image,
    },
  });
  return created.id;
};

export const getReviewById = async (reviewId: number): Promise<Review> => {
    return prisma.review.findFirstOrThrow({where: {id: reviewId}});
};

// 사용자의 리뷰 조회 기능
export const getUserReview = async (
  userId: number
): Promise<
  (Review & {
    store: {
      id: number;
      name: string;
      storeAddress: string } 
  })[]
> => {
  const reviews = await prisma.review.findMany({
      where: {
        userId: userId
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            storeAddress: true
          }
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    return reviews;
};
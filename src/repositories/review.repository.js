import { prisma } from "../db.config.js";

// 가게 리뷰 작성 기능
export const addReview = async (data) => {
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

export const getReviewById = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({where: {id: reviewId}})
    return review;
};

// 사용자의 리뷰 조회 기능
export const getUserReview = async (userId) => {
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
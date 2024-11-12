import { prisma } from "../db.config.js";

// 가게 리뷰 작성 기능
export const addReview = async (data) => {
  const store = await prisma.store.findFirst({where: {id: data.storeId}});
  if (store) {
    return null;
  }
  
  const created = await prisma.review.create({
    data: {
      userId: data.userId,
      storeId: store.id,
      title: data.title,
      content: data.content,
      score: data.score,
      image: data.image,
    },
  });
  return created.id;
};

export const getReviewById = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({where: {id: reviewId.id}})
    return review;
};

// 사용자의 리뷰 조회 기능
export const getUserReview = async (userId) => {
  const reviews = await prisma.review.findMany({
      where: {
        id: userId
      },
      include: {
        store: {
          select: {
            name: true,
            storeAddress: true
          }
        },
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  
    return reviews;
};
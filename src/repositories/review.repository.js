import { prisma } from "../db.config.js";

// 가게 리뷰 작성 기능
export const addReview = async (data) => {
  const user = await prisma.user.findFirst({ where: { id: data.userId } });
  if (!user) {
      throw new Error("해당 사용자가 존재하지 않습니다.");
  }

  const store = await prisma.store.findFirst({where: {id: data.storeId}});
  if(!store){
      throw new Error("해당 가게가 존재하지 않습니다.");
  }
    
  const created = await prisma.review.create({
      data: {
          userId: user.id,
          storeId: store.id,
          title: data.title,
          content: data.content,
          score: data.score,
          image: data.image
      }});
  return created.review_id;
};

export const getReviewById = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({where: {review_id: reviewId}})
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
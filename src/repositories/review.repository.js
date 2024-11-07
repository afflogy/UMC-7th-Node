import { prisma } from "../db.config.js";

// 가게 리뷰 작성 기능
export const addReview = async (data) => {
    const store = await prisma.store.findFirst({where: {store_id: data.store_id}});
    if(!store){
        throw new Error("해당 가게가 존재하지 않습니다.");
    }
    
    const created = await prisma.review.create({
        data: {
            storeId: store.id,
            title: data.title,
            content: data.content,
            score: data.score,
            image: data.image
        }});
    return result.created.review_id;
};

export const getReviewById = async (reviewId) => {
    const review = await prisma.review.findFirstOrThrow({where: {reviewId: reviewId}})
    return review;
};

// 사용자의 리뷰 조회 기능
export const getUserReview = async (data) => {
    const reviews = await prisma.review.findMany({
        where: {
          userId: userId
        },
        include: {
          store: {
            select: {
              name: true,
              store_address: true
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
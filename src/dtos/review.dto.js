// 가게 리뷰 생성
export const bodyToReview = (body, storeId, userId) => {
  return{
    storeId: storeId,
    userId: userId,
    title: body.title,
    content: body.content,
    score: body.score,
    image: body.image || null,
  }
};
  
export const responseFromReview = ({ review }) => {
    return{
      reviewId: review.id,
      userId: review.userId,
      storeId: review.storeId,
      title: review.title,
      content: review.content,
      score: review.score,
      image: review.image || null,
      createdAt: review.createdAt.toISOString(),
    }
};

// 사용자 리뷰 리스트 조회
export const responseFromReviewList = ({ reviews }) => {
  return{
    reviewId: reviews.id,
    name: reviews.store.name,
    storeAddress: reviews.store.storeAddress,
    title: reviews.title,
    content: reviews.content,
    score: reviews.score,
    image: reviews.image || null,
    createdAt: reviews.createdAt
  };

};





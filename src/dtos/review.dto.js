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
  const reviewList = reviews.map((review) => ({
    reviewId: review.id,
    store: {
      id: review.store.id,
      name: review.store.name,
    },
    content: review.content,
    score: review.score,
  }));

  return {
    data: reviewList,
    pagination: {
      cursor: reviews.length > 0 ? reviews[reviews.length - 1].id : null,
    },
  };
};





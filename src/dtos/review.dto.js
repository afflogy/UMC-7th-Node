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
      created_at: review.createdAt.toISOString(),
    }
};

// 사용자 리뷰 리스트 조회
export const responseFromReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return {
      success: true,
      message: "작성한 리뷰가 없습니다.",
      data: []
    };
  }

  const formattedReviews = reviews.map(review => ({
    reviewId: review.id,
    name: review.store.name,
    storeAddress: review.store.storeAddress,
    title: review.title,
    content: review.content,
    score: review.score,
    image: review.image || null,
    createdAt: review.createdAt
  }));

  return {
    success: true,
    message: "리뷰 목록을 성공적으로 불러왔습니다.",
    data: formattedReviews
  };
};





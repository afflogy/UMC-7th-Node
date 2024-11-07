export const bodyToReview = (body, storeId) => {
  return{
    userId: body.userId,
    storeId: storeId,
    title: body.title,
    content: body.content,
    score: body.score,
    image: body.image || null,
  }
};
  
export const responseFromReview = ({ data }) => {
    return{
      reviewId: data.reviewId,
      userId: data.userId,
      title: data.title,
      content: data.content,
      score: data.score,
      image: data.image || null,
      created_at: new Date().toISOString(),
    }
};

// 사용자 리뷰 리스트 조회
export const responseFromReviewList = ({ data }) => {
  if (!reviews || reviews.length === 0) {
    return {
      success: true,
      message: "작성한 리뷰가 없습니다.",
      data: []
    };
  }

  const formattedReviews = reviews.map(review => ({
    reviewId: review.reviewId,
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





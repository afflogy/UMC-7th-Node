export const bodyToReview = (body, store_id) => {
  return{
    user_id: body.user_id,
    store_id: store_id,
    title: body.title,
    content: body.content,
    score: body.score,
    image: body.image || null,
  }
};
  
  export const responseFromReview = ({ data }) => {
    return{
      review_id: data.review_id,
      user_id: data.user_id,
      title: data.title,
      content: data.content,
      score: data.score,
      image: data.image,
      created_at: new Date().toISOString(),
    }
  };
  
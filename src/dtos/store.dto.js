export const bodyToStore = (body) => {
   return{
      store_id: body.store_id,
      name: body.name,
      store_address: body.store_address,
      store_num: body.store_num,
   };
 };
  
 export const responseFromStore = ({ store }) => {
   return{
      store_id: store.store_id,
      name: store.name,
      store_address: store.store_address,
      store_num: store.store_num,
   }
  };
  
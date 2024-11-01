export const bodyToStore = (body) => {
   return{
      name: body.name,
      store_address: body.store_address,
      store_num: body.store_num,
      region: body.region
   };
 };
  
 export const responseFromStore = ({ store }) => {
   return{
      store_id: store.store_id,
      map_id: store.map_id,
      name: store.name,
      store_num: store.store_num,
      region: store.region,
      store_address: store.store_address
   }
  };
  
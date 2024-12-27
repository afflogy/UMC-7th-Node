export const bodyToStore = (body) => {
   return{
      name: body.name,
      storeNum: body.storeNum,
      region: body.region,
      storeAddress: body.storeAddress,
   };
 };
  
 export const responseFromStore = ({ store }) => {
   return{
      storeId: store.id,
      mapId: store.mapId,
      name: store.name,
      storeNum: store.storeNum,
      region: store.region,
      storeAddress: store.storeAddress
   }
  };
  
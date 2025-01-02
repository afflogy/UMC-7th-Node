import { Store, Map } from "@prisma/client";

export const bodyToStore = (body: any) => {
   return{
      name: body.name,
      storeNum: body.storeNum,
      region: body.region,
      storeAddress: body.storeAddress,
   };
 };
  
 export const responseFromStore = ({ store }: { store: ( Store & { region: Map });
}) => {
   return{
      storeId: store.id,
      mapId: store.mapId,
      name: store.name,
      storeNum: store.storeNum,
      region: store.region,
      storeAddress: store.storeAddress
   }
  };
  
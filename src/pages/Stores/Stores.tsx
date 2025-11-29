import StoreCard from "../../components/StoreCard/StoreCard"
import TopSpace from "../../components/Space/TopSpace";
import OrderBar from "../../components/OrderBar/OrderBar";
import type { Menu } from "../../components/MenuItem/MenuItem";
import HeadTitle from "../../components/HeadTitle/HeadTitle";
import Previous from "../../components/Previous/Previous";
import { Page } from "../Home/Home";

interface IStore {
  id: number,
  name: string,
  rate: number,
  reviewCnt: number,
  minDeliveryTime: number,
  maxDeliveryTime: number,
  minDeliveryPrice: number,
  deliveryFee: number,
  menus: Menu[],
  category?: string,
}

const Stores = ( {stores, category}: {stores: IStore[], category: string} ) => {
  return (
    <Page paddingbottomheight={111}>
      <TopSpace child={<Previous />} />
      <HeadTitle className="flex justify-start items-end mb-[0px] mt-[26px] mx-[20px]">{category}</HeadTitle>
        {stores.map( (store) =>
          <StoreCard key={store.id} store={store} />
        )}
      <OrderBar />
    </Page>
  )
};

export default Stores;
export type {IStore};

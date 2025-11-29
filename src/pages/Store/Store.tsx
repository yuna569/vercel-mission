import { Navigate, useParams } from "react-router-dom";
import Previous from "../../components/Previous/Previous";
import HeadTitle from "../../components/HeadTitle/HeadTitle";
import TopSpace from "../../components/Space/TopSpace";
import { useEffect, useState, type ReactElement } from "react";
import MenuItem from "../../components/MenuItem/MenuItem";
import OrderBar from "../../components/OrderBar/OrderBar";
import { Page } from "../Home/Home";
import type { IStore } from "../Stores/Stores";
import { getStore } from "../../api/api";

interface DeliveryInfoProps {
  label: string;
  value: string | number | ReactElement;
}

const DeliveryInfo = ({ label, value }: DeliveryInfoProps) => {
  return (
    <div className="flex flex-row gap-[0.7rem] text-[15px] text-[#4E5968] font-[500] font-pretendard">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
};

const MenuCategory = ({ category }: { category: string }) => {
  return (
    <h3 className="flex flex-row justify-start text-[17px] font-[600] font-pretendard text-[#6B7684] mx-[1.5rem] mt-[1.5rem] mb-[1rem]">
      {category}
    </h3>
  );
};

const Store = () => {
  const { id, category } = useParams();
  if (id == undefined || category == undefined) return <Navigate to="/" replace />;

  const initialStore: IStore = {
    id: '0',
    name: "",
    rate: 0,
    reviewCnt: 0,
    minDeliveryTime: 0,
    maxDeliveryTime: 0,
    minDeliveryPrice: 0,
    deliveryFee: 0,
    menus: [],
    category: "",
  };

  const [store, setStore] = useState(initialStore);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStore(id)
      .then((s) => {
        setStore(s);  // 서버에서 받은 가게 정보를 상태에 반영
        setLoading(false);
        console.log("store: " + s.name);
      })
      .catch(console.error);
  }, [id]);

  if (store === undefined) return <Navigate to="/" replace />;
  if (loading) return <div>Loading...</div>

  return (
    <Page paddingbottomheight={111}>
      <TopSpace child={<Previous prevPage={`/${category}`}/>} />

      <div className="flex flex-col items-start pl-[23px] pb-[1rem] border-b-[1px] border-[#E5E8EB]">
        <HeadTitle className="flex justify-start items-end mb-[5px] mt-[26px] ml-[1px]">
          {store.name}
        </HeadTitle>
        <div className="flex flex-row gap-[0.5rem] mb-[1rem]">
          <span className="flex flex-row gap-[3px]">
            <img src="/src/assets/yellowStar.svg" />
            {store?.rate}
          </span>
          <span>리뷰 {store?.reviewCnt}</span>
        </div>
        <div className="flex flex-col gap-[0.3rem]">
          <DeliveryInfo label="결제방법" value="토스결제만 현장결제 안됨" />
          <DeliveryInfo label="최소주문" value={<>{store.minDeliveryPrice}원</>} />
          <DeliveryInfo label="배달시간" value={<>약 {store.minDeliveryTime}-{store?.maxDeliveryTime}분</>}/>
        </div>
      </div>

      <div>
        <MenuCategory category={category} />
        <ul className="px-[0.3rem]">
          {store.menus?.map((menu) => (<MenuItem key={menu.id} menu={menu} store={store} />))}
        </ul>
      </div>

      <OrderBar />
    </Page>
  );
};

export default Store;

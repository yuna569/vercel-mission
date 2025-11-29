import StoreCard from "../../components/StoreCard/StoreCard";
import TopSpace from "../../components/Space/TopSpace";
import OrderBar from "../../components/OrderBar/OrderBar";
import type { Menu } from "../../components/MenuItem/MenuItem";
import HeadTitle from "../../components/HeadTitle/HeadTitle";
import Previous from "../../components/Previous/Previous";
import { Page } from "../Home/Home";
import { useEffect, useState } from "react";
import { postStores, getStores, patchStore, deleteStore } from "../../api/api";
import { Navigate, useParams } from "react-router-dom";
import Button from "../../components/Button";

interface IStore {
  id: string;
  name: string;
  rate: number;
  reviewCnt: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  minDeliveryPrice: number;
  deliveryFee: number;
  menus: Menu[];
  category?: string;
}

const Stores = () => {
  const { category } = useParams<{ category: string }>();
  if (!category) return <Navigate to="/" replace />

  const [stores, setStores] = useState<IStore[]>([]);
  const typedStores = stores?.map((store) => store as IStore);
  const rankedStores = [...typedStores].sort((a,b) => (b.rate - a.rate == 0)? (b.reviewCnt - a.reviewCnt) : (b.rate - a.rate));

  const [newStore, setNewStore] = useState("");

  useEffect(() => {
    getStores().then(setStores).catch(console.error);
  }, []);

  const onAddStore = (storeName: string) => {
    const store : IStore = {
      id: (Number(stores[stores.length - 1].id) + 1).toString(),
      name: storeName,
      rate: Number((Math.random() * 3.0 + 2.0).toFixed(1)),
      reviewCnt: Math.floor(Math.random() * 5000),
      minDeliveryTime: 20,
      maxDeliveryTime: 50,
      minDeliveryPrice: Math.floor(Math.random() * 9000 + 6000),
      deliveryFee: Math.floor(Math.random() * 3000 + 1500),
      menus: [],
      category: "salad",
    }
    postStores(store)
      .then((data) => {
        setStores((prevStores) => [...prevStores, data]);
      })
      .catch(console.error);
  };

  const onChangeStore = ({ store, newName, }: { store: IStore; newName: string;}) => {
    const updatedStore = { ...store, name: newName };
    const newStores = stores.map((s) => {
      if (s.id === store.id) {
        return { ...s, name: newName };
      }
      return s;
    });
    patchStore(updatedStore)
      .then(() => setStores(newStores))
      .catch(console.error);
  };

  const onDeleteStore = (id: number | string) => {
    deleteStore(id)
      .then(() => {
        setStores((prev) => prev.filter((s)=> s.id != id))
      })
      .catch(console.error);
  };

  return (
    <Page paddingbottomheight={111}>
      <TopSpace child={<Previous />} />
      <HeadTitle className="flex justify-start items-end mb-[0px] mt-[26px] mx-[20px]">
        {category}
      </HeadTitle>
      {rankedStores.map((store, idx) => (
        <StoreCard
          key={store.id}
          rank={idx + 1}
          store={store}
          onChangeStore={onChangeStore}
          onDeleteStore={onDeleteStore}
        />
      ))}

      <div className="w-full flex flex-row justify-center items-center gap-[8px] p-[12px]">
        <input type="text" value={newStore} onChange={(e) => setNewStore(e.target.value)}/>
        <Button onClick={() => {
          onAddStore(newStore);
          setNewStore("");
        }}>추가</Button>
      </div>

      <OrderBar />
    </Page>
  );
};

export default Stores;
export type { IStore };

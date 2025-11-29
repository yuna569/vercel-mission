import type { IStore } from "../../pages/Stores/Stores";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import { useState } from "react";

const StoreCard = ({ store, rank, onChangeStore, onDeleteStore,}: {
  store: IStore;
  rank: number;
  onChangeStore: ({ store, newName, }: { store: IStore; newName: string; }) => void;
  onDeleteStore: (id: string) => void;
}) => {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [newName, setNewName] = useState("");
  const [isModifying, setIsModifying] = useState(false);

  const handleChangeStore = ({
    store,
    newName,
  }: {
    store: IStore;
    newName: string;
  }) => {
    onChangeStore({ store: store, newName: newName });
    setIsModifying(false);
    setNewName("");
  };
  
  const handleCancel = () => {
    setIsModifying(false);
    setNewName("");
  }

  return (
    <div className="w-full flex flex-row justify-between">
      <div
        onClick={() =>
          navigate(`/${store.category ?? category ?? ""}/${store.id}`)
        }
      >
        <div className="h-[116px] bg-white flex flex-row items-start px-[8px] py-[24px] box-border">
          <img
            className="mx-[15px] rounded-[8px]"
            src="https://placehold.co/54x54?text=\n"
          ></img>
          <div className="flex flex-col items-start">
            <p className="inline-block text-[17px] font-[600] p-[0px] m-[0px] font-pretendard">
              {rank <= 3 ? rank + "위" : ""}
            </p>
            <p className="inline-block text-[17px] font-[600] p-[0px] m-[0px]">
              {store.name}
            </p>
            <p className="inline-block text-[13px] font-[500] p-[0px] m-[0px]">
              <img src="/src/assets/star.svg" />
              {store.rate} ({store.reviewCnt})
            </p>
            <p className="inline-block text-[13px] font-[500] p-[0px] m-[0px]">
              {store.minDeliveryTime}분~{store.maxDeliveryTime}분 ∙ 배달비{" "}
              {store.deliveryFee}원
            </p>
          </div>
        </div>
      </div>
      {isModifying ? (
        <div className="flex flex-row gap-[4px] items-center p-[1rem]">
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)}></input>
          <Button size="sm" className="h-[30px]"
            onClick={() => handleChangeStore({ store: store, newName: newName })}>
            저장
          </Button>
          <Button size="sm" className="h-[30px]" onClick={() => handleCancel()}>
            취소
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-[4px] items-center p-[1rem]">
          <Button size="sm" className="h-[30px]" onClick={() => setIsModifying(true)}>
            수정
          </Button>
          <Button size="sm" className="h-[30px]" onClick={() => onDeleteStore(store.id)}>
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};

export default StoreCard;

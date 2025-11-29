import Button from "../Button";
import useCartStore from "../../pages/Cart/useCartStore";
import type { IStore } from "../../pages/Stores/Stores";
import useStoreStore from "../../pages/Store/useStoreStore";
import { useParams } from "react-router-dom";

interface Menu {
  id: number,
  name: string,
  isBest: boolean,
  price: number,
  ingredients: string,
}

const MenuItem = ({ menu, store }: {menu: Menu, store: IStore}) => {
  const menus = useCartStore((state) => state.menus);
  const addMenu = useCartStore((state) => state.addMenu);
  const emptyMenu = useCartStore((state) => state.emptyMenu);
  const addCount = useCartStore((state) => state.addCount);

  const { id } = useParams();

  const storedstore = useStoreStore((state) => state.store);
  const chooseStore = useStoreStore((state) => state.chooseStore);

  const handleAddMenu = () => { 
    if (storedstore.id != '0' && id != storedstore.id) {
      const result = confirm("같은 가게의 메뉴만 담을 수 있어요. 메뉴를 담으시겠습니까?");

      if (result) {
        console.log("확인 선택");
        emptyMenu();
      } else {
        console.log("취소 선택");
        return;
      }
    }

    const m = menus.find((m) => m.id == menu.id);
    if (m == undefined) addMenu({...menu});
    else addCount(menu.id);

    chooseStore(store);
  };

  return (
    <div className="flex flex-row items-center gap-[1rem] p-[0.5rem]">
      <img src="https://placehold.co/54x54?text=\n" className="rounded-full m-[0.2rem]"/>
      <div className="flex flex-col justify-start items-start m-[0px] flex-1 text-left">
        <div className="flex flex-row gap-[0.5rem]"><h3 className="text-[17px] text-[#333D48] font-[600] font-pretendard p-[0px] m-[0px]">{menu?.name}</h3>{menu?.isBest? <div className="text-[17px] text-[#3182F6] font-[600] font-pretendard">BEST</div> : ""}</div>
        <span className="text-[13px] text-[#6B7684] font-[500] font-pretendard p-[0px] m-[0px]">{menu.price}원</span>
        <p className="text-[13px] text-[#6B7684] font-[500] font-pretendard p-[0px] m-[0px]">{menu.ingredients}</p>
      </div>
      <Button onClick={handleAddMenu} type="button" size="sm" className="shrink-0">
        담기
      </Button>
    </div>
  );
};

export default MenuItem;
export type { Menu };
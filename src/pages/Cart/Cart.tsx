import Previous from "../../components/Previous/Previous";
import PayBar from "../../components/PayBar/PayBar";
import BorderSpace from "../../components/Space/BorderSpace";
import TopSpace from "../../components/Space/TopSpace";
import { Page } from "../Home/Home";
import OrderItem from "../../components/OrderItem/OrderItem";
import Border from "../../components/Space/Border";
import useCartStore from "../../pages/Cart/useCartStore";
import useStoreStore from "../../pages/Store/useStoreStore";
import { useNavigate } from "react-router-dom";
import type { IStore } from "../Stores/Stores";

interface OrderInfoProps {
  label: string;
  labelStyle: string;
  value: number | String;
  valueStyle: string;
}

const Cart = () => {
  const menus = useCartStore((state) => state.menus);
  const count = useCartStore((state) => state.count);
  const store = useStoreStore((state) => state.store);

  return (
    <Page paddingbottomheight={129}>
      <TopSpace child={<QuitOrderButton store={store} />} />
      <BorderSpace />
      <div>
        <CartHeader
          storename={store.name}
          minDeliveryPriceOvered={
            store.minDeliveryPrice <=
            menus.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            )
          }
        />
        {menus.map((menu) => (
          <OrderItem
            key={menu.id}
            menu={menu}
            options={"추천소스, 채소볼, 베이컨추가, 시저드드레싱 추가"}
            additionalFee={3000}
            count={count[menu.id]}
          />
        ))}
        <Border />
        <AddMoreButton store={store} />
      </div>
      <BorderSpace />
      <div className="flex flex-col p-[1.5rem] gap-[0.5rem]">
        <OrderInfo
          label="주문금액"
          labelStyle="text-17px text-[#8B95A1] font-[500] font-pretendard"
          valueStyle="text-17px text-[#505967] font-[500] font-pretendard"
          value={menus.reduce(
            (accumulator, currentValue) => accumulator + currentValue.price,
            0
          )}
        ></OrderInfo>
        <OrderInfo
          label="배달요금"
          labelStyle="text-17px text-[#8B95A1] font-[500] font-pretendard"
          value={store.deliveryFee}
          valueStyle="text-17px text-[#505967] font-[500] font-pretendard"
        ></OrderInfo>
        <OrderInfo
          label="총 결제금액"
          labelStyle="text-17px text-[#4E5968] font-[500] font-pretendard pt-[0.5rem]"
          value={
            menus.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price,
              0
            ) + store.deliveryFee
          }
          valueStyle="text-17px text-[#4E5968] font-[600] font-pretendard pt-[0.5rem]"
        ></OrderInfo>
      </div>
      <PayBar
        totalPrice={menus.reduce(
          (accumulator, currentValue) => accumulator + currentValue.price,
          0
        )}
        minDeliveryPrice={store.minDeliveryPrice}
      />
    </Page>
  );
};

const QuitOrderButton = ({ store }: { store: IStore }) => {
  const emptyMenu = useCartStore((state) => state.emptyMenu);
  const navigator = useNavigate();
  const handleQuitOrder = () => {
    const result = confirm("장바구니가 초기화됩니다. 주문을 취소하시겠습니까?");

      if (result) {
        console.log("확인 선택");
        emptyMenu();
        navigator(`/${store.category}`);
      } else {
        console.log("취소 선택");
        return;
      }    
  };
  return (
    <div className="w-[100%] flex flex-row justify-between">
      <Previous />
      <button
        className="bg-transparent border-none p-0 m-0
                focus:outline-none active:outline-none 
                focus:ring-0 active:ring-0 cursor-pointer
                text-[16px] text-[#333D4B] font-[600] font-pretendard "
        onClick={handleQuitOrder}
      >
        주문취소
      </button>
    </div>
  );
};

const CartHeader = ({
  storename,
  minDeliveryPriceOvered,
}: {
  storename: string;
  minDeliveryPriceOvered: boolean;
}) => {
  return (
    <div className="flex flex-row justify-between items-center px-[24px]">
      <h3 className="text-[17px] text-[#6B7684] font-[700] font-pretendard">
        {storename}
      </h3>
      {minDeliveryPriceOvered ? (
        <></>
      ) : (
        <span className="text-[15px] text-[#F04452] font-[500] font-pretendard flex flex-row items-center gap-[0.3rem]">
          최소금액 미달
          <img src="/src/assets/warning.svg" />
        </span>
      )}
    </div>
  );
};

const AddMoreButton = ({ store }: { store: IStore }) => {
  const navigate = useNavigate();
  const handleAddMore = () => {
    navigate(`/${store.category}/${store.id}`);
  };
  return (
    <button
      className="bg-transparent border-none p-0 m-0
                focus:outline-none active:outline-none 
                focus:ring-0 active:ring-0 cursor-pointer
                border-b-1 boreder-b-[#E5E8EB] text-[17px] text-[#3182F6] font-[600] font-pretendard"
      onClick={handleAddMore}
    >
      더 담기 +
    </button>
  );
};

const OrderInfo = ({
  label,
  labelStyle,
  value,
  valueStyle: vStyle,
}: OrderInfoProps) => {
  return (
    <div className="flex flex-row justify-between">
      <span className={labelStyle}>{label}</span>
      <span className={vStyle}>{value}원</span>
    </div>
  );
}; // {store}:{store:IStore}

export default Cart;

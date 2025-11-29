import type { Menu } from "../MenuItem/MenuItem";

interface OrderMenu {
  menu: Menu;
  options: String;
  additionalFee: number;
  count: number;
}

const OrderItem = ({menu, options, additionalFee, count}:OrderMenu) => {
  return (
    <div className="flex flex-row items-center gap-[1rem] p-[1rem]">
      <img src="https://placehold.co/54x54?text=\n" className="rounded-[8px] m-[0.2rem]"/>
      <div className="flex flex-row justify-start items-start m-[0px] flex-1 text-left">
        <div className="flex flex-col gap-[0.5rem]"><h3 className="text-[17px] text-[#333D48] font-[600] font-pretendard p-[0px] m-[0px]">{menu.name}</h3>
          <p className="text-[13px] text-[#6B7684] font-[500] font-pretendard p-[0px] m-[0px]">{options}</p>
          <span className="text-[13px] text-[#6B7684] font-[500] font-pretendard p-[0px] m-[0px]">{menu.price + additionalFee}원</span>
        </div>
      </div>
      <button className="appearance-none bg-transparent border-none p-0 m-0 outline-none focus:outline-none active:outline-none cursor-pointer flex items-center gap-1">
        <span className="text-[#000000]">{count}개</span>
        <img src="/src/assets/more.svg" className="w-[16px] h-[16px]"></img>
      </button>
    </div>
  )
}

export default OrderItem;
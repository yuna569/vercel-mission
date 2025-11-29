import type { IStore } from "../../pages/Stores/Stores"
import { useNavigate } from "react-router-dom";

const StoreCard = ({store}: {store: IStore}) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate("/salad/"+store.id)} className="w-full h-[116px] bg-white flex flex-row items-start px-[8px] py-[24px] box-border">
            <img className="mx-[15px] rounded-[8px]" src="https://placehold.co/54x54?text=\n"></img>
            <div className="flex flex-col items-start">
                <p className="inline-block text-[17px] font-[600] p-[0px] m-[0px] font-pretendard">{store.id <= 3 ? store.id + "위" : ""}</p>
                <p className="inline-block text-[17px] font-[600] p-[0px] m-[0px]">{store.name}</p>
                <p className="inline-block text-[13px] font-[500] p-[0px] m-[0px]"><img src="/src/assets/star.svg"/>{store.rate} ({store.reviewCnt})</p>
                <p className="inline-block text-[13px] font-[500] p-[0px] m-[0px]">{store.minDeliveryTime}분~{store.maxDeliveryTime}분 ∙ 배달비 {store.deliveryFee}원</p>
            </div>
        </div>
    )
}

export default StoreCard;
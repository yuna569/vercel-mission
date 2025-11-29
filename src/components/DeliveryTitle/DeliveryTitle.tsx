import styled from "styled-components";
import HeadTitle from "../HeadTitle/HeadTitle";

const DeliveryTitle = ({address}: {address: string}) => {
    return (
        <DeliveryTextBox>
            <HeadTitle>오늘은 무엇을 먹을까요?</HeadTitle>
            <AddressText>{address}(으)로 배달 {'>'}</AddressText>
        </DeliveryTextBox>
    )
}

const AddressText = styled.button`
    border: none;
    background: none;
    padding: 0;
    outline: none;
    box-shadow: none;
    font: Predendard;
    font-size: 17px;
    font-weight: 500;
    color: #333D48;

`

const DeliveryTextBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 25px;
`

export default DeliveryTitle;
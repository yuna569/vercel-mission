import Categories from "../../components/Categories/Categories";
import DeliveryTitle from "../../components/DeliveryTitle/DeliveryTitle";
import TopSpace from "../../components/Space/TopSpace";
import OrderBar from "../../components/OrderBar/OrderBar";
import styled from "styled-components";

export const CATEGORIES = [
  {name: '피자', imgPath: '/icons/pizza.svg', path: "pizza"},
  {name: '샐러드', imgPath: '/icons/salad.svg', path: "salad"},
  {name: '햄버거', imgPath: '/icons/hamburger.svg', path: "hamburger"},
  {name: '한식', imgPath: '/icons/korean.svg', path: "korean"},
  {name: '분식', imgPath: '/icons/snack.svg', path: "snack"},
  {name: '치킨', imgPath: '/icons/chicken.svg', path: "chicken"},
  {name: '초밥', imgPath: '/icons/sushi.svg', path: "sushi"},
  {name: '샌드위치', imgPath: '/icons/sandwich.svg', path: "sandwich"},
  {name: '파스타', imgPath: '/icons/pasta.svg', path: "pasta"},
  {name: '디저트', imgPath: '/icons/dessert.svg', path: "dessert"},
  {name: '커피', imgPath: '/icons/coffee.svg', path: "coffee"},
  {name: '더보기', imgPath: '/icons/etc.svg', path: "etc"},
];

interface PageBottom {
  paddingbottomheight: number;
}

const Home = () => {
  return (
    <Page paddingbottomheight={111}>
      <TopSpace child={""} />
      <DeliveryTitle address="한남중앙로 40길 (한남 빌리지)" />
      <Categories categories={CATEGORIES} />
      <OrderBar />
    </Page>
  );
};

const Page = styled.div<PageBottom>`
  padding-bottom: ${(props) => props.paddingbottomheight}px;
`

export default Home;
export {Page};
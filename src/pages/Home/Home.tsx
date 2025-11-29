import Categories from "../../components/Categories/Categories";
import DeliveryTitle from "../../components/DeliveryTitle/DeliveryTitle";
import TopSpace from "../../components/Space/TopSpace";
import OrderBar from "../../components/OrderBar/OrderBar";
import styled from "styled-components";
import { useEffect } from "react";
import useCategoryStore from "./useCategoryStore";

interface PageBottom {
  paddingbottomheight: number;
}

const Home = () => {
  const {categories, fetchCategories} = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []); // 의존성 배열 있어야 매 렌더링마다 호출하지 않음

  return (
    <Page paddingbottomheight={111}>
      <TopSpace child={""} />
      <DeliveryTitle address="한남중앙로 40길 (한남 빌리지)" />
      <Categories categories={categories} />
      <OrderBar />
    </Page>
  );
};

const Page = styled.div<PageBottom>`
  padding-bottom: ${(props) => props.paddingbottomheight}px;
`;
export default Home;
export { Page };

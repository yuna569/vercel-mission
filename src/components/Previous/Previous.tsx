import { useNavigate, type To } from "react-router-dom";

const Previous = ({prevPage}:{prevPage?:To}) => {
    const navigate = useNavigate();
    return <button className="appearance-none bg-transparent border-none p-0 m-0 outline-none
               focus:outline-none active:outline-none cursor-pointer p-[0px] m-[0px] border-box
               flex flex-row justify-start items-center"
               onClick={() => {
                if (prevPage) navigate(prevPage)
                else navigate(-1)
               }}>
                <img src="/src/assets/before.svg" style={{margin: " 0 0 0 10px"}}/></button>
}

export default Previous;
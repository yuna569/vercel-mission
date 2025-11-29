import type { ReactNode } from "react";

const TopSpace = ({child}:{child:ReactNode}) => {
    return (
        <div className="h-[88px] w-full flex flex-row justify-start items-end">{child}</div>
    )
}

export default TopSpace;
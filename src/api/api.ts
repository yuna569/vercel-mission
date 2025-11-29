import type { IStore } from "../pages/Stores/Stores";

const API_URL = "http://localhost:3001"

export const getStores = async () => {
    const res = await fetch(API_URL + '/stores');
    if (!res.ok) throw new Error("가게 불러오기 실패");
    return await res.json();
};

export const postStores = async (store: IStore) => {
    const res = await fetch(API_URL + '/stores', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
    });
    if (!res.ok) throw new Error("가게 생성하기 실패");
    return await res.json();
};

export const getStore = async (id: number | string) => {
    const storeId = Number(id);
    if (Number.isNaN(storeId)) throw new Error(`가게 id가 숫자가 아님: ${id}`);
    const res = await fetch(`${API_URL}/stores/${storeId}`);
    if (!res.ok) throw new Error("가게 불러오기 실패");

    const data = await res.json();
    console.log("응답: " + JSON.stringify(data));
    return data;
};

export const patchStore = async (store: IStore) => {
    console.log('요청 본문:', store.id);
    const res = await fetch(API_URL + '/stores/' + store.id.toString(), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: store.name }),
    });
    if (!res.ok) throw new Error("가게 생성하기 실패");

    const data = await res.json();
    console.log('✅ 응답 데이터:', data);

    return data;
}

export const deleteStore = async (id: number | string) => {
    console.log('요청 본문:', id);
    const res = await fetch(API_URL + `/stores/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("가게 삭제하기 실패");

    return await res.json();;
}

export const getCategories = async () => {
    const res = await fetch(API_URL + '/categories');
    if (!res.ok) throw new Error("카테고리 불러오기 실패");
    return await res.json();
};

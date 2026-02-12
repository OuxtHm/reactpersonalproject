export interface CoffeeMainItem{
    id: number,
    menuname: string,
    image: string,
    category: string
}
export interface MainData {
    list: CoffeeMainItem[];
}

export interface CoffeeListData {
    list: CoffeeMainItem[];
    totalPage: number;
    curPage: number;
    startPage: number;
    endPage: number;
}

export interface CoffeeDetailItem {
    id: number;
    menuname: string;
    image: string;
    category: string;
    capacity: number;
    caffeine: number;
    calories: number;
    sodium: number;
    carbohydrate: number;
    sugar: number;
    fat: number;
    saturatedfat: number;
    protein: number;
}
export interface CoffeeDetailData {
    coffeeDto: CoffeeDetailItem;
}

export interface IIngredient {
    _id?: string,
    type?: 'bun' | 'main' | 'sauce',
    name?: string,
    image?: string,
    price?: number,
    calories?: number,
    carbohydrates?: number,
    fat?: number,
    proteins?: number,
    image_large?: string,
    image_mobile?: string,
    __v?: number,
    quantity?: number
}

/*export interface IOrder {
    id?: string,
    type?: string,
    status?: string,
    time?: number,
    price?: number,
    ingredients?: Array<IIngredient>
}*/

export interface IOrder {
    _id?: string,
    createdAt?: number,//string,
    updatedAt?: number,//string,
    number?: number,
    name?: string,
    status?: string,
    ingredients?: Array<IIngredient>
}


export interface INewOrder {
    id?: number,
    name?: string,
    number?: number,
    success?: boolean
}

export interface IUser {
    name?: string,
    password?: string,
    email?: string
}

export interface ICookieProps {
    [name: string]: string | number | boolean | Date | undefined,
    expires?: Date | number | string,
    path?: string
}
//{ [x: string]: any; expires?: any; path?: string; }

/*export type storeType = {
    ingredient: IIngredient;
    order: IOrder;
    newOrder: INewOrder;
    user: IUser;
    cookie: ICookieProps;
}*/


/*
export type storeType = {
    //con: constructorType;
    modal: modalType;
    order: orderType;
    ingridients: ingridientsType;
    refresh: refreshType;
    user: userType;
    ws: wsType;
}*/

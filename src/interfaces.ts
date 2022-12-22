export interface IItemStore{
    name:string
    buy:number
    sell:number
}

export interface IStore{
    items:IItemStore[]
    currentTradeValue:number
    history:IOrderInfo[]
}
export interface IOrderInfo{
    type:string
    price:number
    name:string
    volume:number
    time:any
}
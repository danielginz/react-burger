import { baseUrl } from "./apiUrl";
import checkResponse from './checkResponse';

export default async function getOrderByNumber(number: string | undefined){
   return  await fetch(`${baseUrl}/orders/${number}`,{
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then(res => checkResponse(res))
}
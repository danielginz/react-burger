export default function sum(arr : string[]){
    let answ = new Map()
    arr.forEach(element => {
      !answ.has(element) ? answ.set(element, 1) : answ.set(element, answ.get(element) + 1)
    })
   
    return Array.from(answ)
   }
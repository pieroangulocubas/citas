import { verFechas } from "./use-cases.js";

const dates=await verFechas("Emisión, Rectificación, Renovación o Duplicado de DNI")
const date=new Date()
if(dates.length){
    console.log("\n SI HAY CITAS PARA DNI - ",date)
}else{
    console.log("No hay - ",date)
}

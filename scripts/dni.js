import 'colors';
import { bloquearHorarios, delay, deleteAppointments, obtenerFechasYHorariosDisponiblesPorTramite } from './utils.js';
const servicePasaporteName="Emisión, Rectificación, Renovación o Duplicado de DNI"
const timeoutForDelete=4*60*1000

async function main(){
    let isDeleted=true
    while(isDeleted){
        try{
            const pasaporteTimes=await obtenerFechasYHorariosDisponiblesPorTramite(servicePasaporteName)
            const timesForReserved=pasaporteTimes.slice(0,15)
            console.log(timesForReserved)
            if(timesForReserved.length<1){
                continue
            }
            const reservedAppointments = await bloquearHorarios(servicePasaporteName,timesForReserved)
            isDeleted=false
            console.log(reservedAppointments.length)
            await delay(timeoutForDelete)
            await deleteAppointments(reservedAppointments)
            console.log("Citas Eliminadas")
            isDeleted=true
        }catch(error){
            //console.log(error.message)
        }
    }   
}

main()

    






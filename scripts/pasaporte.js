import 'colors';
import { bloquearHorarios, delay, deleteAppointments, obtenerFechasYHorariosDisponiblesPorTramite } from './utils.js';
const servicePasaporteName="Pasaportes"
const timeoutForDelete=4*60*1000

async function main(){
    let isDeleted=true
    while(isDeleted){
        try{
            await delay(100)
            const pasaporteTimes=await obtenerFechasYHorariosDisponiblesPorTramite(servicePasaporteName)
            const timesForReserved=pasaporteTimes.slice(0,15)
            if(timesForReserved.length<2) continue

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

    






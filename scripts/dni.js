import 'colors';
import { bloquearHorarios, delay, deleteAppointments, obtenerFechasYHorariosDisponiblesPorTramite } from './utils.js';
const servicePasaporteName="Emisión, Rectificación, Renovación o Duplicado de DNI"
const timeoutForDelete=4*60*1000

async function main(){
    let isDeleted=true
    while(isDeleted){
        try{
            await delay(250)
            const pasaporteTimes=await obtenerFechasYHorariosDisponiblesPorTramite(servicePasaporteName)
            const timesForReserved=pasaporteTimes.slice(0,15)
            if(timesForReserved.length<6) continue

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

    






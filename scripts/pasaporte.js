import 'colors';
import { bloquearHorarios, delay, deleteAppointments, obtenerFechasYHorariosDisponiblesPorTramite } from './utils.js';
const servicePasaporteName="Pasaportes"
const timeoutForDelete=4*60*1000

async function main(){
    let isDeleted=true
    while(isDeleted){
        try{
            const pasaporteTimes=await obtenerFechasYHorariosDisponiblesPorTramite(servicePasaporteName)
            const timesForReserved=pasaporteTimes.slice(0,15)
            if(!timesForReserved.length>=8){
                continue
            }
            const reservedAppointments = await bloquearHorarios(servicePasaporteName,timesForReserved)
            isDeleted=false
            console.log(reservedAppointments.length)
            if(reservedAppointments.length>=2){
                await delay(timeoutForDelete)
                const result = await deleteAppointments(reservedAppointments)
                isDeleted=true
                console.log("Citas Eliminadas")
            }else{
                isDeleted=true
            }
        }catch(error){
            //console.log(error.message)
        }
    }   
}

main()

    






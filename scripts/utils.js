import { eliminarCita, reservarHora, verFechas, verHorarios } from "../use-cases.js"

/*notReserved[service]??={}
const notReservedListDates=notReserved[service]
const timesForReserved=times.filter(t=>{
    notReservedListDates[t.date]??=[]
    return !notReservedListDates[t.date].includes(t.time)
})*/ 
export const delay=(timeout)=>new Promise((resolve,_)=>setTimeout(resolve,timeout))

export async function bloquearHorarios(service,times){
    let reservedAppointments=[]
    if(times.length>0){
        const reservedPromises=times.map(({date,time})=>reservarHora(service,date,time))
        const values = await Promise.allSettled(reservedPromises)
        values.forEach(({value:info}) => {
            if(!info.errorMessage){
                const {serviceName,time,id,date}=info
                console.log(`${time} ${date} - ${serviceName}`.green)
                reservedAppointments=[...reservedAppointments,{id,time,date}]   
            }
            console.log(`${info.time} ${info.date} - ${info.errorMessage}`.red)
        })
        return reservedAppointments
    }
    throw new Error("No existen fechas ni horas disponibles")
}

export async function deleteAppointments(reservedAppointments){
    try{
        const deleteAppointmentsPromises = reservedAppointments.map(r=>eliminarCita(r.id))
        return await Promise.allSettled(deleteAppointmentsPromises)
    }catch(_){
        throw new Error("No se pudieron eliminar las citas que ya estaban reservadas")
    }
}

export async function obtenerFechasYHorariosDisponiblesPorTramite(service){
    const results=await verFechas(service)
    const dates=results.map(v=>v.date)
    const getTimesPromises = dates.map(date=>verHorarios(service,date))
    const promisesValues=await Promise.allSettled(getTimesPromises)
    const timesValues = promisesValues.map(({value})=>value).flat()
    return timesValues
}
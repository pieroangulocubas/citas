import { reservarHora, verFechas, verHorarios } from "./use-cases.js";
let reservedAppointments={}
const service="Pasaportes"
const dates=await verFechas(service)
let times=[]
if(dates.length>0){
    times= await verHorarios(service,dates[0].date) || []
}
// Reservar todas las citas posibles para DNI
if(!times.length){
    console.log(`No se encontraron horarios`)
}else{
    const reservedPromises=times.map(({time})=>reservarHora(service,dates[0].date,time))
    Promise.allSettled(reservedPromises)
            .then(values=>{
                values.forEach(appointmentInfo => {
                const {serviceName,time,id,date}=appointmentInfo.value
                if(!serviceName || !time || !id || !date){
                    console.log(` ${values[0].value.errorMessage} !! `)
                }else{
                    reservedAppointments[serviceName]??=[]
                    reservedAppointments[serviceName]=[...reservedAppointments[serviceName],{id,time,date}]
                    console.log(`SE HA RESERVADO CON EXITO EL HORARIO DE LAS ${time} del dia ${dates[0].date}`)
                }
                })
            })
            .catch(error=>console.log(error))
}

import { JSESSIONID, SERVICES, TOKEN } from "./constants.js"
import { DATES_AVAILABLES_BY_SERVICE_URL, DELETE_APPOINTMENT_URL, RESERVE_TIME_URL, TIMES_BY_DATE_URL } from "./services.js"


export async function reservarHora(service,date,time){
  try{
    const {publicId,qpId}=SERVICES[service]
    const requestBody={
      services: [{publicId}],
      custom: JSON.stringify({peopleServices: [
          {
            publicId,
            qpId,
            adult: 1,
            name:service,
            child: 0,
          },
        ]})
      }
      
      const customHeaders=new Headers()
      customHeaders.append('Content-Type','application/json')
      customHeaders.append('X-CSRF-Token',TOKEN)
      customHeaders.append('Cookie',`JSESSIONID=${JSESSIONID}`)
      console.log(RESERVE_TIME_URL(date,time))
      const response= await fetch(RESERVE_TIME_URL(date,time),{
        method:"POST",
        body:JSON.stringify(requestBody),
        headers:customHeaders
      })
      return await response.json()
  }catch(error){
    console.log(error)
    throw new Error(error)
  }

}



export async function eliminarCita(appointmentId){
  try{
    const customHeaders=new Headers()
    customHeaders.append('Cookie',`JSESSIONID=${JSESSIONID}`)

    const response = await fetch(DELETE_APPOINTMENT_URL(appointmentId),{
      method:'DELETE',
      headers:customHeaders
    })

    return await response.status
  }catch(error){
    console.log(error)
    throw new Error(error)
  }
 
}



export async function verFechas(service){
  const {publicId}=SERVICES[service]
  const response = await fetch(DATES_AVAILABLES_BY_SERVICE_URL(publicId))
  return await response.json()
}



export async function verHorarios(service,date){
  const {publicId}=SERVICES[service]
  const response = await fetch(TIMES_BY_DATE_URL(date,publicId))
  return await response.json()
}






export function verFechasReservadas(reservedAppointments,service){
 const dateList = [... new Set(reservedAppointments[service].map(appointment=>appointment.date))] 
 return dateList.map(date=>({date}))
}

export function verHorariosAEliminar(reservedAppointments,service,dateSelected){
  let times=[]
  reservedAppointments[service].forEach(({time,date})=>{
    if(date === dateSelected) times = [...times,{time}]  
  })

  return times
}


export function obtenerPublicId(reservedAppointments,service,date,timesSelected){
  const appointmentFiltered = reservedAppointments[service].filter(appointment=>appointment.date === date)
  const publicIds = timesSelected.map(time =>
    appointmentFiltered.find(appointment => appointment.time === time).publicId
  );
  return publicIds
}


export function actualizarCitasReservadas(reservedAppointments,service,date,timesSelected){

  const appointmentFiltered = reservedAppointments[service].filter(appointment=> !(appointment.date === date && timesSelected.includes(appointment.time)))

  if(appointmentFiltered.length){
    reservedAppointments[service]=appointmentFiltered
    return reservedAppointments
  }
  const {[service]:excludeKey,...reservedAppointmentsUpdated} = reservedAppointments
  return reservedAppointmentsUpdated
}
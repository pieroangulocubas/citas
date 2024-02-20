import { availableServices } from "./constants.js";
import { datesMenu, inquirerMenu, mostrarListadoChecklist, pausa, servicesMenu } from "./helpers/inquirer.js";
import { actualizarCitasReservadas, eliminarCita, obtenerPublicId, reservarHora, verFechas, verFechasReservadas, verHorarios, verHorariosAEliminar } from "./use-cases.js";

async function main () {
  let reservedAppointments={}
  let opt
  do {
    opt = await inquirerMenu()
    switch (opt) {
      case 1:
        /*const response = await reservarHora("Pasaportes","2024-01-03","12:54")
        console.log(response)*/
        const service = await servicesMenu(availableServices)
        const dates = await verFechas(service)
        if (dates.length){
          const date = await datesMenu(dates)
          const times = await verHorarios(service,date)
          const timesSelected = await mostrarListadoChecklist(times)
          const reservedPromises = timesSelected.map((time)=>reservarHora(service,date,time))
          Promise.allSettled(reservedPromises)
          .then(values=>{
            values.forEach(appointmentInfo => {
              const {serviceName,time,publicId,date}=appointmentInfo.value
              if(!serviceName || !time || !publicId || !date){
                console.log(` ${values[0].value.errorMessage} !! `.bgRed)
              }else{
                reservedAppointments[serviceName]??=[]
                reservedAppointments[serviceName]=[...reservedAppointments[serviceName],{publicId,time,date}]
                console.log(`\n SE HA RESERVADO CON EXITO EL HORARIO DE LAS ${time} :C !! `.bgCyan.black)
              }
            })
          })
          .catch(error=>console.log(error.red))
        }else{
          console.log("\n NO HAY FECHAS DISPONIBLES :C !! ".bgRed)
        }
        break
      case 2:
        if(!Object.keys(reservedAppointments).length){
          console.log("\n NO EXISTEN RESERVAS POR AHORA ".bgYellow)
        }else{
          const serviceSelected = await servicesMenu(Object.keys(reservedAppointments))
          const datesForDelete = verFechasReservadas(reservedAppointments,serviceSelected)
          const date=await datesMenu(datesForDelete)
          const times = await verHorariosAEliminar(reservedAppointments,serviceSelected,date)
          const timesSelected = await mostrarListadoChecklist(times)

          if(!timesSelected.length) continue

          const idsToDelete = obtenerPublicId(reservedAppointments,serviceSelected,date,timesSelected)
          const reservedPromises = idsToDelete.map((id)=>eliminarCita(id))
          Promise.allSettled(reservedPromises)
          .then(_=>{
            reservedAppointments = actualizarCitasReservadas(reservedAppointments,serviceSelected,date,timesSelected)
            console.log(" SE HAN ELIMINADO LAS RESERVAS CON EXITO ".bgGreen.white)
          })
        }
        break
      case 0:
        console.log('\n HASTA LUEGO, BYE BYE ;) '.bgWhite.black)
        break
    }
    if (opt !== 0) await pausa()
  } while (opt !== 0)
}
main()


import 'colors';
import inquirer from 'inquirer';





const datesOptions=(dates)=>{
  const choices = dates.map(({date},index)=>{
    const order = `${index+1}.`.green;
    return {value:date,name:`${order} ${date}`}
  })
  const options =[
   {
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una fecha',
    choices
  }
]
  return options
}



const datesMenu= async (dates)=>{
  const { opcion } = await inquirer.prompt(datesOptions(dates))
  return opcion
}



const servicesListOptions=(servicesList)=>{
  const choices = servicesList.map((service,index)=>{
    const order = `${index+1}.`.green;
    return {value:service, name:`${order} ${service}`}
  })
  const options=[
   {
    type: 'list',
    name: 'opcion',
    message: '¿Para que trámite?',
    choices
  }
]
  return options
}



const servicesMenu=async (servicesList)=>{
  const { opcion } = await inquirer.prompt(servicesListOptions(servicesList))
  return opcion
}








const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Reservar Cita`
      },
      {
        value: 2,
        name: `${'2.'.green} Eliminar Reserva`
      },
      {
        value: 0,
        name: `${'0.'.green} Salir`
      }
    ]
  }
]




const inquirerMenu = async () => {
  console.clear()
  console.log('=========================='.green)
  console.log('  Seleccione una opción'.white)
  console.log('==========================\n'.green)

  const { opcion } = await inquirer.prompt(preguntas)

  return opcion
}



const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'enter'.green} para continuar`
    }
  ]

  console.log('\n')
  console.log('\n')
  await inquirer.prompt(question)
}
















const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor'
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)
  return desc
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

const confirmar = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok
}

const mostrarListadoChecklist = async (times = []) => {
  const choices = times.map(({time}, i) => (
    {
      value: time,
      name: ` ${time}`,
      checked: false
    }
  ))

  const pregunta = [
    {
      type: 'checkbox',
      name: 'timesSelected',
      message: 'Seleccione uno o mas horarios',
      choices
    }
  ]

  const { timesSelected } = await inquirer.prompt(pregunta)
  return timesSelected
}

export {
  confirmar, datesMenu, inquirerMenu, leerInput,
  listadoTareasBorrar, mostrarListadoChecklist, pausa, servicesMenu
};


export const SERVICES={
  "Pasaportes":{
    qpId:"1",
    publicId:"a75954e48a3b6e729b9831d2a3490bc0f933654be616214740ef1a733351c7c0"
  },
  "Emisión, Rectificación, Renovación o Duplicado de DNI":{
    qpId:"8",
    publicId:"dd5601892d3df8accd5684c2840ae2c743d757b09dde3e1c68676ace1aba165d"
  },
  "Autorización de viaje de menor":{
    qpId:"9",
    publicId:"951ea200d58f3bd229be821c5b944e867d73d6ad61ea61d9dd94e1bceefc4b84"
  },
  "Certificado de no inscripción de menor":{
    qpId:"23",
    publicId:"6c885e609577ab5a9b319703ed8c80c2b82113536868425fddc33abb63411cb7"
  },
  "Cartas poder":{
    qpId:"12",
    publicId:"d625caa14e41a7bc5e558d9a22081642f626ff022300d7130675a5cbb79aece8"
  },
  "Salvoconductos":{
    qpId:"16",
    publicId:"9ad3c26d94b4b4d6c10f1cd16abac11d9d7068d344ec3fd56df41477530bbce7"
  },
  "Declaración Jurada":{
    qpId:"24",
    publicId:"6fc363c267bee8c745f1c64d6b1c7bff8f6fcbffe0e3e6218482778a198ef761"
  },
  "Legalización de firma":{
    qpId:"10",
    publicId:"6119da43dcdbcf8f56cb47c4ad741787e59ea98dc2fdacc6761fde91f7cbe129"
  },
  "Legalización (compulsa) de copias":{
    qpId:"11",
    publicId:"6f2739b4a571eae4617ad15e07b1a0f4a7a9c73eac33965c81d9f02806e20140"
  },
  "Registro nacimiento":{
    qpId:"2",
    publicId:"78b5e278a273cbab6a3f577fb215fe91610dbe7914c87af0c7bf8858058eb776"
  },
  "Registro de matrimonio":{
    qpId:"17",
    publicId:"0e93fcb1b3d8d04c8cb5f2ad276d1f114c1518cb4e32dd42604316b58fb0337e"
  }
}

export const availableServices=Object.keys(SERVICES)

export const JSESSIONID=process.env.s
export const TOKEN=process.env.t

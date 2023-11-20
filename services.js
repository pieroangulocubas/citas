export const DATES_AVAILABLES_BY_SERVICE_URL=(serviceId)=>`https://cita.consuladoperumadrid.org/qmaticwebbooking/rest/schedule/branches/f16e4735888f68606f069193ef218172252eacbe0cbfb4ce15f22fbd4405fe1f/dates;servicePublicId=${serviceId};customSlotLength=12`

export const TIMES_BY_DATE_URL=(date,serviceId)=>`https://cita.consuladoperumadrid.org/qmaticwebbooking/rest/schedule/branches/f16e4735888f68606f069193ef218172252eacbe0cbfb4ce15f22fbd4405fe1f/dates/${date}/times;servicePublicId=${serviceId};customSlotLength=12`

export const RESERVE_TIME_URL=(date,time)=>`https://cita.consuladoperumadrid.org/qmaticwebbooking/rest/schedule/branches/f16e4735888f68606f069193ef218172252eacbe0cbfb4ce15f22fbd4405fe1f/dates/${date}/times/${time}/reserve;customSlotLength=12`

export const DELETE_APPOINTMENT_URL=(reserveId)=>`https://cita.consuladoperumadrid.org/qmaticwebbooking/rest/schedule/appointments/reserved/${reserveId}`




import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface IAppointments {
  id: string;
  provider: string;
  date: Date;
}

const appointments: IAppointments[] = [];

appointmentsRouter.get('/', (request, response) => {

  return response.json(appointments);
});

appointmentsRouter.get('/:id', (request, response) => {
  const { id } = request.params;

  const appointment = appointments.find(appointment => appointment.id === id);

  if(!appointment) {
    return response.status(404).json({error: 'Appointment not found'});
  }

  return response.json(appointment);
})

appointmentsRouter.post('/', (request, response) => {

  const { provider, date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment => isEqual(parseDate, appointment.date));

  if(findAppointmentInSameDate){
    return response.status(404).json({error: 'This appointment is already book'})
  }

  const appointment = {
    id: uuid(),
    provider,
    date: parseDate
  }

  appointments.push( appointment );

  return response.json(appointment);

});

appointmentsRouter.put('/:id', (request, response) => {
  const { id } = request.params;
  const { provider, date } = request.body;

  const appointmentIndex = appointments.findIndex(appointment => appointment.id === id);


  return response.json({method: `PUT:ID - ${request.params.id}`});
});

appointmentsRouter.delete('/:id', (request, response) => {
  return response.json({method: `DELETE:ID - ${request.params.id}`});
});

export default appointmentsRouter;

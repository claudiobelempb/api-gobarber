import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const appointmentsRouter = Router();

const appointments = [];

appointmentsRouter.get('/', (request, response) => {
  return response.json({method: `GET:`});
});

appointmentsRouter.get('/:id', (request, response) => {
  return response.json({method: `GET:ID - ${request.params.id}`});
})

appointmentsRouter.post('/', (request, response) => {

  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date
  }

  return response.json(appointment);

});

appointmentsRouter.put('/:id', (request, response) => {
  return response.json({method: `PUT:ID - ${request.params.id}`});
});

appointmentsRouter.delete('/:id', (request, response) => {
  return response.json({method: `DELETE:ID - ${request.params.id}`});
});

export default appointmentsRouter;

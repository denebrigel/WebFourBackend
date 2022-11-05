import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Ticket,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTicketController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ticket', {
    responses: {
      '200': {
        description: 'Usuario has one Ticket',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ticket),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ticket>,
  ): Promise<Ticket> {
    return this.usuarioRepository.ticket(id).get(filter);
  }

  @post('/usuarios/{id}/ticket', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ticket)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {
            title: 'NewTicketInUsuario',
            exclude: ['codDeFactura'],
            optional: ['usuarioId']
          }),
        },
      },
    }) ticket: Omit<Ticket, 'codDeFactura'>,
  ): Promise<Ticket> {
    return this.usuarioRepository.ticket(id).create(ticket);
  }

  @patch('/usuarios/{id}/ticket', {
    responses: {
      '200': {
        description: 'Usuario.Ticket PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ticket, {partial: true}),
        },
      },
    })
    ticket: Partial<Ticket>,
    @param.query.object('where', getWhereSchemaFor(Ticket)) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.usuarioRepository.ticket(id).patch(ticket, where);
  }

  @del('/usuarios/{id}/ticket', {
    responses: {
      '200': {
        description: 'Usuario.Ticket DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ticket)) where?: Where<Ticket>,
  ): Promise<Count> {
    return this.usuarioRepository.ticket(id).delete(where);
  }
}

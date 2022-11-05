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
  Tarifa,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioTarifaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/tarifa', {
    responses: {
      '200': {
        description: 'Usuario has one Tarifa',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tarifa),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Tarifa>,
  ): Promise<Tarifa> {
    return this.usuarioRepository.tarifa(id).get(filter);
  }

  @post('/usuarios/{id}/tarifa', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tarifa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifa, {
            title: 'NewTarifaInUsuario',
            exclude: ['codDeTarifa'],
            optional: ['usuarioId']
          }),
        },
      },
    }) tarifa: Omit<Tarifa, 'codDeTarifa'>,
  ): Promise<Tarifa> {
    return this.usuarioRepository.tarifa(id).create(tarifa);
  }

  @patch('/usuarios/{id}/tarifa', {
    responses: {
      '200': {
        description: 'Usuario.Tarifa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarifa, {partial: true}),
        },
      },
    })
    tarifa: Partial<Tarifa>,
    @param.query.object('where', getWhereSchemaFor(Tarifa)) where?: Where<Tarifa>,
  ): Promise<Count> {
    return this.usuarioRepository.tarifa(id).patch(tarifa, where);
  }

  @del('/usuarios/{id}/tarifa', {
    responses: {
      '200': {
        description: 'Usuario.Tarifa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Tarifa)) where?: Where<Tarifa>,
  ): Promise<Count> {
    return this.usuarioRepository.tarifa(id).delete(where);
  }
}

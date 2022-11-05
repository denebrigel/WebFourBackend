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
  Perfil,
  Vehiculo,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilVehiculoController {
  constructor(
    @repository(PerfilRepository) protected perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Perfil has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.perfilRepository.vehiculo(id).get(filter);
  }

  @post('/perfils/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Perfil model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Perfil.prototype.nombre,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInPerfil',
            exclude: ['placa'],
            optional: ['perfilId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'placa'>,
  ): Promise<Vehiculo> {
    return this.perfilRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/perfils/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Perfil.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.perfilRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/perfils/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Perfil.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.perfilRepository.vehiculo(id).delete(where);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Perfil, PerfilRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class PerfilRepository extends DefaultCrudRepository<
  Perfil,
  typeof Perfil.prototype.nombre,
  PerfilRelations
> {

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Perfil.prototype.nombre>;

  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Perfil, dataSource);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}

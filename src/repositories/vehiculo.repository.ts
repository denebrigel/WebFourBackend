import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.placa,
  VehiculoRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Vehiculo.prototype.placa>;

  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}

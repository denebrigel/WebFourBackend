import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.nombre,
  AdministradorRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Administrador.prototype.nombre>;

  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Administrador, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}

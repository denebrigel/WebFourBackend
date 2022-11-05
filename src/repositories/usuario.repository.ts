import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Ticket, Tarifa} from '../models';
import {TicketRepository} from './ticket.repository';
import {TarifaRepository} from './tarifa.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly ticket: HasOneRepositoryFactory<Ticket, typeof Usuario.prototype.id>;

  public readonly tarifa: HasOneRepositoryFactory<Tarifa, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource, @repository.getter('TicketRepository') protected ticketRepositoryGetter: Getter<TicketRepository>, @repository.getter('TarifaRepository') protected tarifaRepositoryGetter: Getter<TarifaRepository>,
  ) {
    super(Usuario, dataSource);
    this.tarifa = this.createHasOneRepositoryFactoryFor('tarifa', tarifaRepositoryGetter);
    this.registerInclusionResolver('tarifa', this.tarifa.inclusionResolver);
    this.ticket = this.createHasOneRepositoryFactoryFor('ticket', ticketRepositoryGetter);
    this.registerInclusionResolver('ticket', this.ticket.inclusionResolver);
  }
}

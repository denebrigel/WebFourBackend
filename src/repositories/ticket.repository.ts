import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Ticket, TicketRelations} from '../models';

export class TicketRepository extends DefaultCrudRepository<
  Ticket,
  typeof Ticket.prototype.codDeFactura,
  TicketRelations
> {
  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource,
  ) {
    super(Ticket, dataSource);
  }
}

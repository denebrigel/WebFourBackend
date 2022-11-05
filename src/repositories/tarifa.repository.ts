import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DsparqueaderoDataSource} from '../datasources';
import {Tarifa, TarifaRelations} from '../models';

export class TarifaRepository extends DefaultCrudRepository<
  Tarifa,
  typeof Tarifa.prototype.codDeTarifa,
  TarifaRelations
> {
  constructor(
    @inject('datasources.dsparqueadero') dataSource: DsparqueaderoDataSource,
  ) {
    super(Tarifa, dataSource);
  }
}

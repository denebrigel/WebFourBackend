import {Entity, model, property} from '@loopback/repository';

@model()
export class Tarifa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codDeTarifa?: number;

  @property({
    type: 'string',
    required: true,
  })
  TipodeVehiculo: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  constructor(data?: Partial<Tarifa>) {
    super(data);
  }
}

export interface TarifaRelations {
  // describe navigational properties here
}

export type TarifaWithRelations = Tarifa & TarifaRelations;

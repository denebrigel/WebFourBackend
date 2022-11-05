import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  placa?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDeVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  HoraDeEntrada: number;

  @property({
    type: 'number',
    required: true,
  })
  HoraDeSalida: number;

  @belongsTo(() => Usuario, {name: 'usuario'})
  usuarioid: string;

  @property({
    type: 'string',
  })
  perfilId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;

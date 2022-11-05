import {Entity, model, property, hasOne} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model({settings: {strict: false}})
export class Perfil extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  nombre?: string;

  @property({
    type: 'string',
    default: true,
  })
  password?: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;

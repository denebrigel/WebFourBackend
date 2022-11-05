import {Entity, model, property, hasOne} from '@loopback/repository';
import {Ticket} from './ticket.model';
import {Tarifa} from './tarifa.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @hasOne(() => Ticket)
  ticket: Ticket;

  @property({
    type: 'string',
  })
  administradorId?: string;

  @hasOne(() => Tarifa)
  tarifa: Tarifa;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;

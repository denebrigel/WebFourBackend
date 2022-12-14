import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Ticket extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  codDeFactura?: string;

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

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Ticket>) {
    super(data);
  }
}

export interface TicketRelations {
  // describe navigational properties here
}

export type TicketWithRelations = Ticket & TicketRelations;

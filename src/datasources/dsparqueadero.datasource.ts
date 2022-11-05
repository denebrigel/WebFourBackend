import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dsparqueadero',
  connector: 'mongodb',
  url: 'mongodb+srv://admin:Vickysan0069@clusterprogweb.qqanbiw.mongodb.net/DWG28',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DsparqueaderoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dsparqueadero';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dsparqueadero', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

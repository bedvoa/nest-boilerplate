import { ConfigConstantValue } from 'src/constant/config.constant';
import { UserEntity } from 'src/core/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: ConfigConstantValue.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [UserEntity],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

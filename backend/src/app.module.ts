// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrdersModule } from './orders/orders.module';
// import { SocketModule } from './socket/socket.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // makes config available globally
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         type: 'mysql',
//         host: config.get<string>('DB_HOST'),
//         port: config.get<number>('DB_PORT'),
//         username: config.get<string>('DB_USERNAME'),
//         password: config.get<string>('DB_PASSWORD'),
//         database: config.get<string>('DB_NAME'),
//         entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         synchronize: true,
//       }),
//     }),
//     OrdersModule,
//     SocketModule,
//   ],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true, // recommended for NestJS
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, // Required for some Render databases
        },
      }),
    }),
    OrdersModule,
    SocketModule,
  ],
})
export class AppModule {}


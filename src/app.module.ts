import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/board/board.module';
import { ProductCategoryModule } from './apis/product-category/product-category.module';
import { ProductModule } from './apis/product/product.module';
import { UserModule } from './apis/users/user.module';

@Module({
  imports: [
    AuthModule,
    BoardModule,
    ProductCategoryModule,
    ProductModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gks1004*',
      database: 'myProject03',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: false,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

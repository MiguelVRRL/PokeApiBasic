import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfigurations } from './common/config/app.config';
import { joiValidationsSchema } from './common/config/joi.validations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfigurations],
      validationSchema: joiValidationsSchema,
    }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {
  constructor(
    private readonly configService:ConfigService
    ){
      // ver .env (dev)
      //console.log(process.env)
    }
}

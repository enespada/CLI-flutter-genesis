export const appModule = (capitalized: string, lowercased: string) =>
  `import { ${capitalized}Service } from '@application/${lowercased}/${lowercased}.service';
import { JwtModule } from '@core/middlewares/jwt/jwt.module';
import { LoggerModule } from '@core/services/logger/logger.module';
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}DomainService } from '@domain/${lowercased}/${lowercased}.domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${capitalized}Controller } from './${lowercased}.controller';
import { SessionModule } from '@core/services/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([${capitalized}]),
    SessionModule,
    LoggerModule,
    JwtModule,
  ],
  controllers: [${capitalized}Controller],
  providers: [${capitalized}Service, ${capitalized}DomainService],
  exports: [${capitalized}Service, ${capitalized}DomainService],
})
export class ${capitalized}Module {}
`;

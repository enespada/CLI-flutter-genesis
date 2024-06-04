export const createDTO = (capitalized: string) =>
  `export class Create${capitalized}DTO {}`;

export const updateDTO = (
  capitalized: string
) => `import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Update${capitalized}DTO {
  @ApiProperty()
  @IsUUID()
  id: string;
}
`;

export const paginationDTO = (
  capitalized: string,
  lowercased: string
) => `import {
  ${capitalized},
  ${capitalized}OrderBy,
  ${capitalized}Relations,
} from '@domain/${lowercased}/entities/${lowercased}.entity';
import { PageOptionsDTO } from '@core/database/dto/pagination-options.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class ${capitalized}PageOptionsDTO extends PageOptionsDTO {
  @ApiProperty({ enum: ${capitalized}OrderBy, default: ${capitalized}OrderBy.id, required: false })
  @IsEnum(${capitalized}OrderBy)
  @IsOptional()
  readonly orderBy?: ${capitalized}OrderBy = ${capitalized}OrderBy.id;

  @ApiProperty({
    required: false,
    isArray: true,
    enum: ${capitalized}Relations,
    default: [],
  })
  @IsEnum(${capitalized}Relations, { each: true })
  @IsOptional()
  @Transform((data) => (Array.isArray(data.value) ? data.value : [data.value]))
  readonly relations?: Array<${capitalized}Relations> = [];

  @ApiProperty({ required: false })
  @IsOptional()
  where?: Partial<${capitalized}>;
}
`;

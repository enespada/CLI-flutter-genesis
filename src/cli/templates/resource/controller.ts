export const controller = (
  capitalized: string,
  lowercased: string,
  variable: string
) => `import { ${capitalized}Service } from '@application/${lowercased}/${lowercased}.service';
import { ExceptionFilter } from '@core/exceptions/global.exception';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Post,
  Put,
  UseFilters,
  UseGuards,
  ParseUUIDPipe
} from '@nestjs/common';
import { JwtUserGuard } from '@core/middlewares/jwt/user/jwt-user.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { Create${capitalized}DTO } from './dto/create-${lowercased}.dto';
import { Update${capitalized}DTO } from './dto/update-${lowercased}.dto';
import { ${capitalized} } from '@domain/${lowercased}/entities/${lowercased}.entity';
import { ${capitalized}PageOptionsDTO } from './dto/${lowercased}-pagination-options.dto';

@Controller('${lowercased}')
@ApiTags('${capitalized}')
@UseFilters(ExceptionFilter)
@UseGuards(JwtUserGuard)
// @UseInterceptors(TransformInterceptor)
@ApiUnauthorizedResponse({
  description: 'Bearer token must be a valid Token',
})
export class ${capitalized}Controller {
  constructor(private readonly ${variable}Service: ${capitalized}Service) {}

  //-----------------------------------------------POST-----------------------------------------------------------
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Saves an ${lowercased}' })
  @ApiBody({ type: Create${capitalized}DTO })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ${capitalized},
    description: 'Retrieves a saved ${lowercased}',
  })
  save(
    @Body()
    create${variable}Dto: Create${capitalized}DTO,
  ) {
    return this.${variable}Service.create(create${variable}Dto);
  }

  //-----------------------------------------------GET-----------------------------------------------------------
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Gets all ${lowercased}' })
  @ApiOkResponse({
    type: Array<${capitalized}>,
    isArray: true,
    description: 'Retrieves an array of ${lowercased}',
  })
  getAll() {
    return this.${variable}Service.find();
  }
  
  //-----------------------------------------------GET paginate-----------------------------------------------------------
  @Get('paginate')
  @ApiOperation({ summary: 'Paginate ${lowercased}' })
  @ApiExtraModels(${capitalized})
  @ApiQuery({
    required: false,
    name: 'where',
    style: 'deepObject',
    explode: true,
    type: 'object',
    schema: {
      $ref: getSchemaPath(${capitalized}),
    },
  })
  @ApiOkResponse({
    type: Array<${capitalized}>,
    isArray: true,
    description: 'Retrieves an array of ${capitalized}',
  })
  paginate(@Query() ${lowercased}PageOptionsDto: ${capitalized}PageOptionsDTO) {
    return this.${variable}Service.paginate(${lowercased}PageOptionsDto);
  }

  //-----------------------------------------------GET :id-----------------------------------------------------------
  @Get(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${lowercased}',
  })
  @ApiOperation({ summary: 'Gets a ${lowercased} by given id' })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves ${lowercased} data',
  })
  @ApiResponse({
    description: 'There is no ${lowercased} with the given id',
    status: HttpStatus.NOT_FOUND,
  })
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.${variable}Service.findOne({
      where: {
        id,
      }
    });
  }

  //-----------------------------------------------PUT-----------------------------------------------------------
  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Updates a ${lowercased}' })
  @ApiBody({ type: Update${capitalized}DTO })
  @ApiOkResponse({
    type: ${capitalized},
    description: 'Retrieves an updated ${lowercased}',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The request sent to the server is invalid or corrupted',
  })
  update(
    @Body()
    update${capitalized}Dto: Update${capitalized}DTO,
  ) {
    return this.${variable}Service.update(update${capitalized}Dto);
  }

  //-----------------------------------------------DELETE :id-----------------------------------------------------------
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletes a ${lowercased}' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier of the ${lowercased}',
  })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '${capitalized} successfully deleted',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.${variable}Service.remove(id);
  }
}
`;

export const entity = (
  capitalized: string
) => `import { AbstractEntity } from '@core/database/entity/abstract.entity';
import { Entity } from 'typeorm';

@Entity()
export class ${capitalized} extends AbstractEntity {
}

export enum ${capitalized}OrderBy {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

export enum ${capitalized}Relations {}
`;

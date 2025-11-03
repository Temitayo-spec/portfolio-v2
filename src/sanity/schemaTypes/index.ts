import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { clientsType } from './clientsType'
import { worksType } from './worksType'
import { rolesType } from './rolesType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [clientsType, worksType, rolesType],
}

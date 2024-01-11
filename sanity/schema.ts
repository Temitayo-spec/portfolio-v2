import { type SchemaTypeDefinition } from 'sanity'

// import blockContent from './schemas/blockContent'
// import category from './schemas/category'
// import post from './schemas/post'
// import author from './schemas/author'
import works from './schemas/works'
import clients from './schemas/clients'
import roles from './schemas/roles'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [works, clients, roles],
}

import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'roles',
  title: 'Roles',
  type: 'document',
  fields: [
    defineField({
      name: 'role_list',
      title: 'List of my roles in the project',
      type: 'string',
    }),
  ],
});

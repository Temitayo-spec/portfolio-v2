import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'clients',
  title: 'Clients and Collaborators',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: "Client's or Collaborator's name with role",
      type: 'string',
    }),
  ],
});

import { defineField, defineType } from 'sanity';

export const worksType = defineType({
  name: 'works',
  title: 'Works',
  type: 'document',
  fields: [
    defineField({
      name: 'project_title',
      title: 'Title of Project',
      type: 'string',
    }),
    defineField({
      name: 'brief_discussion',
      title: 'Brief discussion on the project',
      type: 'text',
    }),
    defineField({
      name: 'clients_collaborators',
      title: 'Client and Collaboratorss',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'clients' } }],
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'roles' } }],
    }),
    defineField({
      name: 'project__link',
      title: 'Link to Project',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],

  preview: {
    select: {
      title: 'project_title',
    },
    prepare(selection) {
      const { title } = selection;
      return { ...selection, title };
    },
  },
});

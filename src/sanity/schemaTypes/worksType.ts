import { defineArrayMember, defineField, defineType } from 'sanity';

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
      name: 'type',
      title: 'Type of project',
      description: 'Used to filter the works page.',
      type: 'string',
      options: {
        list: [
          { title: 'Mobile app', value: 'mobile' },
          { title: 'Website or web app', value: 'web' },
          { title: 'Backend or tool', value: 'backend' },
        ],
        layout: 'radio',
      },
      initialValue: 'web',
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      description:
        'Shown in the works carousel and list hover. A 16:10 screenshot works best.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'brief_discussion',
      title: 'Brief discussion on the project',
      type: 'text',
    }),
    defineField({
      name: 'stack',
      title: 'Tech stack',
      description: 'e.g. Next.js, Sanity, GSAP',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
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
      name: 'featured',
      title: 'Feature on home page',
      description:
        'Featured works lead the home page carousel. If none are featured, the latest works are shown.',
      type: 'boolean',
      initialValue: false,
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
      media: 'cover',
    },
    prepare(selection) {
      const { title, media } = selection;
      return { title, media };
    },
  },
});

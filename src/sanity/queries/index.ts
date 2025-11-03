import { defineQuery } from 'next-sanity';

export const works = defineQuery(`*[_type == "works"]{
  ...,
  roles[]->,
    clients_collaborators[]->
} | order(publishedAt desc)`);

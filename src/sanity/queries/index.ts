import { defineQuery } from 'next-sanity';

export const works = defineQuery(`*[_type == "works"]{
  ...,
  "coverUrl": cover.asset->url,
  "coverLqip": cover.asset->metadata.lqip,
  roles[]->,
    clients_collaborators[]->
} | order(publishedAt desc)`);

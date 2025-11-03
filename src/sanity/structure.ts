import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Projects')
    .items([
      S.documentTypeListItem('clients').title('Clients'),
      S.divider(),
      S.documentTypeListItem('roles').title('Roles'),
      S.divider(),
      S.documentTypeListItem('works').title('Works'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !['clients', 'roles', 'works'].includes(item.getId()!)
      ),
    ]);

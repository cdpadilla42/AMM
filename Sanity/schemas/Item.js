export default {
  title: 'Item',
  name: 'item',
  type: 'document',
  fieldsets: [
    {
      title: 'Descriptions',
      name: 'descriptions',
    },
  ],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'For Sanity use only, does not appear in game',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Part A',
      name: 'descriptionA',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'descriptions',
    },
    {
      title: 'Part B',
      name: 'descriptionB',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'descriptions',
    },
    {
      title: 'Part C',
      name: 'descriptionC',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'descriptions',
    },
    {
      title: 'Part D',
      name: 'descriptionD',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'descriptions',
    },
  ],
};

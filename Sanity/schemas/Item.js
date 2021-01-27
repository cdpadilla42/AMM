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
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Part A',
      name: 'descriptionA',
      type: 'string',
      fieldset: 'descriptions',
    },
    {
      title: 'Part B',
      name: 'descriptionB',
      type: 'string',
      fieldset: 'descriptions',
    },
    {
      title: 'Part C',
      name: 'descriptionC',
      type: 'string',
      fieldset: 'descriptions',
    },
    {
      title: 'Part D',
      name: 'descriptionD',
      type: 'string',
      fieldset: 'descriptions',
    },
  ],
};

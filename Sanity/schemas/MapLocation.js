export default {
  title: 'Map Location',
  name: 'mapLocation',
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
    // {
    //   title: 'Part B',
    //   name: 'descriptionB',
    //   type: 'array',
    //   of: [{ type: 'block' }],
    //   fieldset: 'descriptions',
    //   hidden: ({ parent }) => true;
    // },
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

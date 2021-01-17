export default {
  title: 'Animal',
  name: 'animal',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Icon Image',
      name: 'normal',
      description: 'Not used in game',
      type: 'image',
    },
    {
      title: 'Color',
      name: 'color',
      description: `Used in name tag and collored accents.`,
      type: 'color',
    },
  ],
};

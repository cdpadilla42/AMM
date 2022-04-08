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
      description: 'Fall back in case no description set for current act',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Restrict User from adding to inventory?',
      name: 'restrictUserAddingToInventory',
      type: 'boolean',
      description: 'If this is an item that is explicitly given, turn this on',
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

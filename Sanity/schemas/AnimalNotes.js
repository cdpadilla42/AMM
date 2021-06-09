export default {
  title: 'Animal Notes',
  name: 'animalNotes',
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
      title: 'Nickname',
      name: 'nickname',
      type: 'string',
      description: 'Used for text highlighting',
    },
    {
      title: 'Animal Ref',
      name: 'animalRef',
      type: 'reference',
      to: [{ type: 'animal' }],
      description:
        'Reference to the Animal doc. Helps with picking the color for highlighted text',
    },
    {
      title: 'Notes',
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

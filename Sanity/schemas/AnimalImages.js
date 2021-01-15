export default {
  title: 'AnimalImages',
  name: 'animalImage',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: 'Animal name. For organizing purposes only.',
    },
    {
      title: 'Animal',
      name: 'animal',
      type: 'reference',
      description: 'Reference to Animal document',
      to: [{ type: 'animal' }],
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      description: 'Sprites of different emotions',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
              description: 'Emotion name. For organizing purposes only.',
            },
            {
              title: 'Emotion',
              name: 'emotion',
              type: 'reference',
              description: 'Reference to emotion document',
              to: [{ type: 'emotions' }],
            },
            {
              title: 'Neutral Image',
              name: 'normal',
              type: 'image',
            },
          ],
        },
      ],
    },
  ],
};

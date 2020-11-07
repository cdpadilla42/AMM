export default {
  title: 'Conversation',
  name: 'conversation',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Dialogue',
      name: 'dialogue',
      type: 'array',
      of: [
        {
          // turn into refferences to dialogue
          type: 'reference',
          to: [{ type: 'dialogue' }],
        },
      ],
    },
  ],
};

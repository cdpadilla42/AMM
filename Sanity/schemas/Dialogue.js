export default {
  title: 'Dialogue',
  name: 'dialogue',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Conversation',
      name: 'conversation',
      type: 'reference',
      to: [{ type: 'conversation' }],
    },
    {
      title: 'Phrases',
      name: 'phrase',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
            {
              title: 'Emotion',
              name: 'emotion',
              type: 'reference',
              to: [{ type: 'emotions' }],
            },
            {
              title: 'Speaker',
              name: 'speaker',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Response Options',
      name: 'responseOptions',
      type: 'array',
      of: [
        {
          title: 'Response',
          name: 'response',
          type: 'object',
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
            {
              title: 'Following Dialogue',
              name: 'followingDialogue',
              type: 'reference',
              to: [{ type: 'dialogue' }],
            },
          ],
        },
      ],
    },
  ],
};

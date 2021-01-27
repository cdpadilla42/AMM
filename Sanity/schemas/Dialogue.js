export default {
  title: 'Dialogue',
  name: 'dialogue',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        "Named either 'Start' or the response text from the previous dialogue",
    },
    {
      title: 'Conversation',
      name: 'conversation',
      type: 'reference',
      description:
        'Ex: Ankha Act 3. Should reference an already defined conversation',
      to: [{ type: 'conversation' }],
    },
    {
      title: 'Phrases',
      name: 'phrase',
      type: 'array',
      description: 'Lines of dialogue',
      of: [
        {
          type: 'object',
          preview: {
            select: {
              title: 'text',
              media: 'emotion.image', // Use the image of emotion field as thumbnail
            },
          },
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
              type: 'reference',
              to: [{ type: 'animal' }],
            },
          ],
        },
      ],
    },
    {
      title: 'Response Options',
      name: 'responseOptions',
      type: 'array',
      description: 'Possible answers user can give',
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
              description:
                'Reference a dialogue to jump to after answering with this response',
            },
          ],
        },
      ],
    },
    {
      title: 'Prompt for Evidence?',
      name: 'needEvidence',
      type: 'boolean',
      description: 'Switch on if you need to present someone or something',
    },
    {
      title: 'Required Evidence',
      name: 'requiredEvidence',
      description:
        'Only required if above is on. Must reference an item or animal note',
      // type: 'reference',
      // to: [{ type: 'item' }, { type: 'animalNotes' }],
      type: 'array',
      of: [
        {
          title: 'Possible Evidence',
          name: 'possibleEvidence',
          type: 'reference',
          to: [{ type: 'item' }, { type: 'animalNotes' }],
        },
      ],
    },
    {
      title: 'Special Event',
      name: 'specialEvent',
      type: 'document',
      description: 'Optional trigger for a specific event',
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
      ],
    },
    {
      title: 'Final dialogue of conversation??',
      name: 'isFinalDialogue',
      type: 'boolean',
      description:
        'Switch on if you want to leave this scene after this portion of dialouge.',
    },
    // {
    //   title: 'Following Dialogue',
    //   name: 'followingDialogue',
    //   type: 'reference',
    //   to: [{ type: 'dialogue' }],
    // },
  ],
};

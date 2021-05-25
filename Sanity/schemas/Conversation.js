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
      title: 'Background',
      name: 'background',
      type: 'reference',
      to: [{ type: 'background' }],
      description: 'Setting for the conversation',
    },
    {
      title: 'Act',
      name: 'act',

      type: 'string',
      options: {
        list: [
          { title: 'Act I (A)', value: 'a' },
          { title: 'Act II (B)', value: 'b' },
          { title: 'Act III (C)', value: 'c' },
          { title: 'Act IV (D)', value: 'd' },
        ],
      },
    },
    // {
    //   title: 'Dialogue',
    //   name: 'dialogue',
    //   type: 'array',
    //   of: [
    //     {
    //       // turn into refferences to dialogue
    //       type: 'reference',
    //       to: [{ type: 'dialogue' }],
    //     },
    //   ],
    // },
  ],
};

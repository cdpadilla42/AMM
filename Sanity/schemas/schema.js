// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'testimony',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    {
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
    },
    {
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
    },
    {
      title: 'Emotions',
      name: 'emotions',
      type: 'document',
      fields: [
        {
          title: 'Emotion',
          name: 'emotion',
          type: 'string',
        },
      ],
    },
    {
      title: 'Animal',
      name: 'animal',
      type: 'document',
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
        },
      ],
    },
  ]),
});

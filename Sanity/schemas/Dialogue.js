export default {
  title: 'Dialogue',
  name: 'dialogue',
  type: 'document',
  fieldsets: [
    {
      title: 'Evidence',
      name: 'evidenceSet',
      description: 'For presenting item, animal note, or map location',
    },
  ],
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description:
        "Named either 'Start' or the response text from the previous dialogue",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Conversation',
      name: 'conversation',
      type: 'reference',
      description:
        'Ex: Ankha Act 3. Should reference an already defined conversation',
      to: [{ type: 'conversation' }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Animals',
      name: 'animals',
      type: 'array',
      validation: (Rule) => Rule.max(2),
      hidden: ({ parent }) => true,
      description:
        'If more than one animal at the start of the conversation put em here!',
      of: [
        {
          title: 'Animal',
          name: 'animal',
          type: 'reference',
          to: [{ type: 'animal' }],
        },
      ],
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
              subtitle: 'speaker.name', // Use the Animals name as the subtitle
              media: 'emotion.image', // Use the image of emotion field as thumbnail
            },
          },
          fieldsets: [
            {
              title: 'Change position',
              name: 'changePosition',
            },
            {
              title: 'Agent S Notes Event',
              name: 'sNote',
            },
            {
              title: 'Image',
              name: 'imageFieldset',
            },
          ],
          fields: [
            {
              title: 'Text',
              name: 'text',
              type: 'string',
              validation: (Rule) => Rule.max(130),
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
            {
              title: 'Link',
              name: 'link',
              type: 'boolean',
              description:
                'Turn on if you would like the next phrase added to this one',
            },
            {
              title: 'Change position',
              name: 'changePosition',
              type: 'boolean',
              description: 'On if you want to change animal positions',
              fieldset: 'changePosition',
            },
            {
              title: 'Centered Animal',
              name: 'leftAnimalCentered',
              type: 'boolean',
              description:
                'On if you want to switch to only one animal. Info pulled from Speaker field',
              fieldset: 'changePosition',
              hidden: ({ parent }) => !parent.changePosition,
            },
            {
              title: 'Left Animal',
              name: 'leftAnimal',
              type: 'reference',
              to: [{ type: 'animal' }],
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Left Orientation',
              name: 'leftOrientation',
              type: 'string',
              initialValue: 'Right',
              description:
                '* Marks default. If nothing selected, default will be used',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Right*', value: 'right' },
                ],
                layout: 'radio',
              },
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Left Emotion',
              name: 'leftEmotion',
              type: 'reference',
              description:
                'Use if this is not the current speakeer and you want a change',
              to: [{ type: 'emotions' }],
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Right Animal',
              name: 'rightAnimal',
              type: 'reference',
              to: [{ type: 'animal' }],
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Right Orientation',
              name: 'rightOrientation',
              type: 'string',
              initialValue: 'left',
              description:
                '* Marks default. If nothing selected, default will be used',
              options: {
                list: [
                  { title: 'Left*', value: 'left' },
                  { title: 'Right', value: 'right' },
                ],
                layout: 'radio',
              },
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Right Emotion',
              name: 'rightEmotion',
              type: 'reference',
              to: [{ type: 'emotions' }],
              description:
                'Use if this is not the current speakeer and you want a change',
              fieldset: 'changePosition',
              hidden: ({ parent }) =>
                !parent.changePosition || parent.leftAnimalCentered,
            },
            {
              title: 'Agent S Notes Event',
              name: 'sNotesEventTriggered',
              type: 'boolean',
              description: 'On if this dialogue triggers an event',
              fieldset: 'sNote',
            },
            {
              title: 'Agent S Notes Event Type',
              name: 'sNotesEventType',
              type: 'string',
              description: 'Adding or completing a note',
              options: {
                list: ['Add', 'Complete'],
                layout: 'radio',
              },
              fieldset: 'sNote',
              hidden: ({ parent }) => !parent.sNotesEventTriggered,
            },
            {
              title: 'Agent S Notes Event Reference',
              name: 'sNotesEventRef',
              type: 'reference',
              to: [{ type: 'snotes' }],
              description:
                'Reference to the note created in the Agent S Notes Doc type in Sanity.',
              fieldset: 'sNote',
              hidden: ({ parent }) => !parent.sNotesEventTriggered,
            },
            {
              title: 'Show Image',
              name: 'showImage',
              type: 'boolean',
              description:
                'If you previously set an image and want to keep showing it, turn this on.',
              fieldset: 'imageFieldset',
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image',
              description:
                'If first phrase that "Show Image" is on, add photo here. Or if you want to change images.',
              fieldset: 'imageFieldset',
              hidden: ({ parent }) => !parent.showImage,
            },
          ],
        },
      ],
    },
    {
      title: 'Response Options',
      name: 'responseOptions',
      type: 'array',
      hidden: ({ parent }) => parent.needEvidence,
      description:
        'Possible answers user can give. Not Required if presenting evidence.',
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
      fieldset: 'evidenceSet',
    },
    {
      title: 'Risk of Losing Health',
      name: 'loseHealthOnIncorrect',
      type: 'boolean',
      description:
        'User will lose health when answering incorrectly if this is toggle to on.',
      hidden: ({ parent }) => !parent.needEvidence,
      fieldset: 'evidenceSet',
    },
    {
      title: 'Required Evidence',
      name: 'requiredEvidence',
      fieldset: 'evidenceSet',
      hidden: ({ parent }) => !parent.needEvidence,
      description: 'Must reference an item, animal note, or map location',
      type: 'array',
      of: [
        {
          title: 'Possible Evidence',
          name: 'possibleEvidence',
          type: 'reference',
          to: [
            { type: 'item' },
            { type: 'animalNotes' },
            { type: 'mapLocation' },
          ],
        },
      ],
    },
    {
      title: 'Following Dialogue',
      name: 'followingDialogueFromEvidence',
      type: 'reference',
      to: [{ type: 'dialogue' }],
      fieldset: 'evidenceSet',
      hidden: ({ parent }) => !parent.needEvidence,
      description:
        'Reference a dialogue to jump to after answering with this response',
    },
    // {
    //   title: 'Special Event',
    //   name: 'specialEvent',
    //   type: 'document',
    //   description: 'Optional trigger for a specific event',
    //   fields: [
    //     {
    //       title: 'Name',
    //       name: 'name',
    //       type: 'string',
    //     },
    //     {
    //       title: 'Description',
    //       name: 'description',
    //       type: 'string',
    //     },
    //   ],
    // },
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

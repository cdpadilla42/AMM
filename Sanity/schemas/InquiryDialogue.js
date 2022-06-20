export default {
  title: 'Inquiry',
  name: 'inquiry',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: "Name after piece of evidence presented or 'Default'",
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Evidence',
      name: 'presentedEvidence',
      // hidden: ({ parent }) => !parent.needEvidence,
      description:
        'Must reference an item, animal note, or map location. This is what the conversation starts with',
      type: 'array',
      hidden: ({ parent }) => parent.defaultResponse,
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
      title: 'Default Response?',
      name: 'defaultResponse',
      type: 'boolean',
      description:
        "Turn on if this is for an item the animal doesn't know anything about",
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
      title: 'Prereq Ref',
      name: 'prereqRef',
      type: 'reference',
      description: 'If required, reference the prereq by name',
      to: [{ type: 'prereq' }],
    },
    {
      title: 'Personal Notes',
      name: 'personalNotes',
      description: "For your use only, won't show up on the site anywhere",
      type: 'array',
      of: [{ type: 'block' }],
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
              title: 'Item Event',
              name: 'itemEvent',
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
              validation: (Rule) => Rule.max(131),
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
              title: 'Grey Text',
              name: 'isGrey',
              type: 'boolean',
              description: 'For whispering and all that',
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
              title: 'Cetered Orientation',
              name: 'centeredOrientation',
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
                !parent.changePosition ||
                (parent.changePosition && !parent.leftAnimalCentered),
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
              title: 'Item Event',
              name: 'itemEventTriggered',
              type: 'boolean',
              description: 'On if this dialogue triggers an item event',
              fieldset: 'itemEvent',
            },
            {
              title: 'Item Event Type',
              name: 'itemEventType',
              type: 'string',
              description: 'Adding or completing a note',
              options: {
                list: ['Add', 'Remove'],
                layout: 'radio',
              },
              fieldset: 'itemEvent',
              hidden: ({ parent }) => !parent.itemEventTriggered,
            },
            {
              title: 'Item Event Reference',
              name: 'itemEventRef',
              type: 'reference',
              to: [{ type: 'item' }],
              description: 'Reference to the item.',
              fieldset: 'itemEvent',
              hidden: ({ parent }) => !parent.itemEventTriggered,
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
  ],
};

export default {
  title: "Agent S's Notes",
  name: 'snotes',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      description: `What our app identifies it by (and helps me debug!) Use this to link to a part of dialogue. Examples: "crimeSceneCheckOut" or "footprints"`,
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      description: 'The actual note that will end up in the notebook.',
    },
    {
      title: 'Success Message',
      name: 'successMessage',
      type: 'string',
      description: 'Shows in toast message on completion',
    },
    {
      title: 'Count',
      name: 'count',
      type: 'number',
      description:
        'If there are multiple pieces to get before checking off. Like the footprints. Leave blank if not.',
    },
    {
      title: 'Achievement',
      name: 'achievement',
      type: 'boolean',
      description: 'Always pursuing and only shows notification on victory.',
    },
    {
      title: 'hidden',
      name: 'hidden',
      type: 'boolean',
      description:
        'Internal use only, no notification given to the player on succeeding',
    },
    {
      title: 'Notes',
      name: 'notes',
      type: 'array',
      of: [{ type: 'block' }],
      description:
        'Internal use only, for describing any special events or considerations. Hard to search, keep note of SNotes with special properties outside of Sanity.',
    },
  ],
};

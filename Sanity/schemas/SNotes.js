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
      title: 'Count',
      name: 'count',
      type: 'number',
      description:
        'If there are multiple pieces to get before checking off. Like the footprints. Leave blank if not.',
    },
  ],
};

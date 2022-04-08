export default {
  title: 'Inquiry Prerequesite',
  name: 'prereq',
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
      description: 'Personal use only.',
    },
  ],
};

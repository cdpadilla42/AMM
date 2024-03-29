// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Importing schemas
import Animal from './Animal';
import Assets from './Assets';
import Conversation from './Conversation';
import Dialogue from './Dialogue';
import Emotions from './Emotions';
import Item from './Item';
import MapLocation from './MapLocation';
import AnimalNotes from './AnimalNotes';
import Background from './Background';
import AnimalImages from './AnimalImages';
import SNotes from './Snotes';
import InquiryDialogue from './InquiryDialogue';
import Prereq from './Prereq';
import Image from './Image';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'testimony',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    Conversation,
    Dialogue,
    Emotions,
    Animal,
    Assets,
    AnimalImages,
    Item,
    MapLocation,
    AnimalNotes,
    Background,
    SNotes,
    InquiryDialogue,
    Prereq,
    Image,
  ]),
});

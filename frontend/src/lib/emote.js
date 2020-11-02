const emote = (emotion) => {
  switch (emotion) {
    case 'angry':
      console.log('MAD!');
      break;
    case 'sad':
      console.log(':(');
      break;
    case 'laughing':
      console.log('HAHAHA');
      break;
    case 'sleepy':
      console.log('zzzz');
      break;
    default:
      console.log(':)');
      break;
  }
};

export default emote;

const animals = [
  {
    name: 'Ankha',
    image: 'url',
  },
  {
    name: 'Katt',
    image: 'url',
  },
  {
    name: 'Sterling',
    image: 'url',
  },
];

function filterString(str) {
  animals.forEach((animal) => {
    if (str.includes(animal.name)) {
      str = str.replace(
        animal.name,
        `<img src="${animal.image}"><span>${animal.name}</span>`
      );
    }
  });

  return str;
}

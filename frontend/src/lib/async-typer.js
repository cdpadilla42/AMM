import React from 'react';

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 10, max = 25, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

export const useHighlightFilter = ({ items = [], animals = [] }) => {
  const highlightFilter = (string) => {
    let newString = string || '';
    items.forEach((item) => {
      newString = newString.replaceAll(
        `${item.name}`,
        `<span class="highlight">${item.name}</span>`
      );
    });
    // animal nickname
    animals.forEach((animal) => {
      if (animal.nickname) {
        animal.nickname.forEach((nickname) => {
          const query = nickname;

          newString = newString.replaceAll(
            query,
            `<img class="highlighted_text_icon" src="${animal.imageUrl}?h=18" /> <span class="highlight">${nickname}</span>`
          );
        });
      }

      if (animal.name === 'Sterling' && animals.length === 0) {
        newString = newString.replaceAll(
          new RegExp("Sterlin'", 'gi'),
          `<img class="highlighted_text_icon" src="${animal.imageUrl}?h=18" /> <span class="highlight">Sterlin'</span>`
        );
      }

      if (animal.name === 'Ankha' && animals.length === 0) {
        newString = newString.replaceAll(
          new RegExp('Ankhaaaa', 'gi'),
          `<img class="highlighted_text_icon" src="${animal.imageUrl}?h=18" /> <span class="highlight">Ankhaaaa</span>`
        );
      }
    });
    // animal name
    animals.forEach((animal) => {
      let query;
      const animalHighlightStyle = animal.animalRef
        ? `style="color: ${animal.animalRef.color.hex};"`
        : '';
      if (animal.name === 'Katt') {
        query = new RegExp(`Katt(?!('s )?Junkyard)`, 'gi');
      } else {
        query = animal.name;
      }
      newString = newString.replaceAll(
        query,
        `<img class="highlighted_text_icon" src="${animal.imageUrl}?h=18" /> <span class="highlight">${animal.name}</span>`
      );
    });

    return newString;
  };

  return highlightFilter;
};

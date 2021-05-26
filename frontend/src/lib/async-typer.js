function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 10, max = 25, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

export const useDraw = ({ items = [], animals = [] }) => {
  const highlightFilter = (string) => {
    let newString = string;
    items.forEach((item) => {
      newString = newString.replaceAll(
        `${item.name}`,
        `<span class="highlight">${item.name}</span><i><img style="height: 19px; width: 19px;" src="${item.imageUrl}" /></i>`
      );
    });
    console.log(animals);
    animals.forEach((animal) => {
      let query;
      if (animal.name === 'Katt') {
        query = new RegExp(`Katt(?!('s )?Junkyard)`, 'gi');
        console.log(query);
      } else {
        query = animal.name;
      }
      newString = newString.replaceAll(
        query,
        `<span class="highlight">${animal.name}</span><i><img style="height: 19px; width: 19px;" src="${animal.imageUrl}" /></i>`
      );
    });
    return newString;
  };

  async function draw(el, text, options = { isTrailing: false }) {
    console.log(text, 'text');
    let showText = '';
    if (options.isTrailing) {
      console.log('Trailing...');
      showText = document.querySelector('.text_box__text .show').textContent;
    }
    console.log('Drawing!');
    // const text = el.dataset.text;
    const html = `
      <span class="show"></span><span class="hide" style="color: rgba(0,0,0,0);"></span>`;
    el.innerHTML = html;
    const showField = el.querySelector('.show');
    const hideField = el.querySelector('.hide');
    console.log(showField);
    let hideText = text;

    for (const letter of text) {
      showText += letter;
      hideText = hideText.slice(1);
      showField.innerHTML = highlightFilter(showText);
      hideField.textContent = hideText;
      const { typeMin, typeMax } = el.dataset;
      const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
      await wait(amountOfTimeToWait);
    }
  }

  return draw;
};

// const draw = useDraw();

// const text = document.querySelector('.text_box__text');
// const buttons = document.querySelectorAll('button');
// buttons.forEach((button) => {
//   button.addEventListener('click', () => draw(text));
// });

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 10, max = 25, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

async function draw(el, text, options = { isTrailing: false }) {
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
    showField.textContent = showText;
    hideField.textContent = hideText;
    const { typeMin, typeMax } = el.dataset;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);
  }
}

const text = document.querySelector('.text_box__text');
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => draw(text));
});

export default draw;

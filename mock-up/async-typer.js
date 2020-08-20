function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 10, max = 15, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

async function draw(el) {
  const text = el.textContent;
  const html = `
    <span class="show"></span><span class="hide" style="color: rgba(0,0,0,0);"></span>`;
  el.innerHTML = html;
  const showField = el.querySelector('.show');
  const hideField = el.querySelector('.hide');
  console.log(showField);
  let hideText = text;
  let showText = '';
  for (const letter of text) {
    showText += letter;
    hideText = hideText.slice(1);
    showField.textContent = showText;
    hideField.textContent = hideText;
    const { typeMin, typeMax } = el.dataset;
    const amountOfTimeToWait = getRandomBetween(typeMin, 100);
    await wait(amountOfTimeToWait);
  }
}

// async for of loop
// async function draw(el) {
//   const text = el.textContent;
//   let soFar = '';
//   for (const letter of text) {
//     soFar += letter;
//     el.textContent = soFar;
//     // wait for some amount of time
//   }
// }

const text = document.querySelector('.text_box__text');
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => draw(text));
});

draw(text);

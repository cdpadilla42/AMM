import React from 'react';

function wait(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomBetween(min = 10, max = 25, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

export const useHighlightFilter = ({ items = [], animals = [] }) => {
  const highlightFilter = (string) => {
    let newString = string;
    items.forEach((item) => {
      newString = newString.replaceAll(
        `${item.name}`,
        `<span class="highlight">${item.name}</span>`
      );
    });
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
        `<img style="height: 19px; width: 19px;" src="${animal.imageUrl}" /> <span class="highlight">${animal.name}</span>`
      );
    });
    return newString;
  };

  return highlightFilter;
};

// export const useDraw = ({ items = [], animals = [] }) => {
//   async function draw(el, text, options = { isTrailing: false }) {
//     function handleHtmlEl(letter) {
//       htmlString.push(letter);
//       if (letter === '>') {
//         // exit
//       }
//     }
//     console.log(text, 'text');
//     let showText = '';
//     if (options.isTrailing) {
//       console.log('Trailing...');
//       showText = document.querySelector('.text_box__text .show').textContent;
//     }
//     console.log('Drawing!');
//     // const text = el.dataset.text;
//     const html = `
//       <span class="show"></span><span class="hide" style="color: rgba(0,0,0,0);"></span>`;
//     el.innerHTML = html;
//     const showField = el.querySelector('.show');
//     const hideField = el.querySelector('.hide');
//     console.log(showField);
//     let hideInnerHtmlContent = text;
//     const iterationText = highlightFilter(text);

//     // for parsing html
//     let htmlString = '';
//     let readingHTMLString = false;
//     let interpolatingInsideHtmlTag = false;
//     let skippingClosingTag = false;
//     let listeningForTag = false;
//     let tag = '';
//     let interpolationTarget = null;

//     for (const letter of iterationText) {
//       console.log(showText);
//       if (letter === '>' && skippingClosingTag) {
//         skippingClosingTag = false;
//         tag = '';
//         continue;
//       }
//       if (skippingClosingTag) continue;
//       if (letter === ' ' && listeningForTag) {
//         listeningForTag = false;
//         htmlString += letter;
//         continue;
//       }
//       if (listeningForTag) {
//         htmlString += letter;
//         tag += letter;
//         continue;
//       }
//       if (letter === '<' && !interpolatingInsideHtmlTag) {
//         readingHTMLString = true;
//         listeningForTag = true;
//         htmlString += letter;
//         continue;
//       }
//       if (letter === '<' && interpolatingInsideHtmlTag) {
//         skippingClosingTag = true;
//         interpolatingInsideHtmlTag = false;
//         continue;
//       }
//       if (letter === '>' && !skippingClosingTag) {
//         // TODO ALMOST THERE!!! Figure out how to interpolate within a span. Probs need to use query selector here.
//         // store an element that you add in the to stream as a JS DOM element, then refference it to add your inner text
//         htmlString += letter;
//         if (tag !== 'img') {
//           htmlString += `</${tag}>`;
//           interpolatingInsideHtmlTag = true;
//         }
//         showText += htmlString;
//         showField.innerHTML = showText;
//         if (tag !== 'spanimg')
//           interpolationTarget = showField.querySelector(tag);
//         console.log(showField);
//         console.log(interpolationTarget);
//         htmlString = '';
//         readingHTMLString = false;
//         continue;
//       }
//       if (interpolatingInsideHtmlTag) {
//         console.log('letter', letter);
//         console.log(interpolationTarget);
//         interpolationTarget.textContent =
//           interpolationTarget.textContent + letter;
//         continue;
//       }
//       if (readingHTMLString) {
//         htmlString += letter;
//         continue;
//       }
//       if (!readingHTMLString) {
//         showText += letter;
//       }
//       hideInnerHtmlContent = hideInnerHtmlContent.slice(1);
//       showField.innerHTML = showText;
//       hideField.textContent = hideInnerHtmlContent;
//       const { typeMin, typeMax } = el.dataset;
//       const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
//       await wait(amountOfTimeToWait);
//     }
//   }

//   return draw;
// };

// const draw = useDraw();

// const text = document.querySelector('.text_box__text');
// const buttons = document.querySelectorAll('button');
// buttons.forEach((button) => {
//   button.addEventListener('click', () => draw(text));
// });

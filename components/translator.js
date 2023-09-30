const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  translate(direction, text) {
    const trailingDot = text.lastIndexOf('.') === text.length - 1;

    const words = trailingDot ? text.slice(0, -1).split(' ') : text.split(' ');

    let changes = false;

    const highlightChange = word => {
      changes = true;

      return `<span class="highlight">${word}</span>`;
    };

    const resultWords = words.map(
      direction === 'american-to-british'
        ? this.translateAmericanToBritish(highlightChange)
        : this.translateBritishToAmerican(highlightChange)
    );

    return changes
      ? trailingDot
        ? `${resultWords.join(' ')}.`
        : resultWords.join(' ')
      : 'Everything looks good to me!';
  }

  handleStartWithUppercase(oldWord, newWord) {
    if (/^[A-Z].*$/.test(oldWord)) {
      return `${newWord.slice(0, 1).toUpperCase()}${newWord.slice(1)}`;
    }

    return newWord;
  }

  translateAmericanToBritish(highlightChange) {
    const TIME_REGEX = /^\d{1,2}:\d\d$/;

    return word => {
      if (TIME_REGEX.test(word)) {
        return highlightChange(word.replace(':', '.'));
      }

      const searchWord = word.toLowerCase();

      if (americanOnly[searchWord]) {
        return highlightChange(this.handleStartWithUppercase(word, americanOnly[searchWord]));
      }

      if (americanToBritishSpelling[searchWord]) {
        return highlightChange(this.handleStartWithUppercase(word, americanToBritishSpelling[searchWord]));
      }

      if (americanToBritishTitles[searchWord]) {
        return highlightChange(this.handleStartWithUppercase(word, americanToBritishTitles[searchWord]));
      }

      return word;
    };
  }

  translateBritishToAmerican(highlightChange) {
    const TIME_REGEX = /^\d{1,2}.\d\d$/;

    return word => {
      if (TIME_REGEX.test(word)) {
        return highlightChange(word.replace('.', ':'));
      }

      const searchWord = word.toLowerCase();

      if (britishOnly[searchWord]) {
        return highlightChange(this.handleStartWithUppercase(word, britishOnly[searchWord]));
      }

      const americanSpelling = Object.entries(americanToBritishSpelling).find(
        ([american, british]) => british === searchWord
      )?.[0];
      if (americanSpelling) {
        return highlightChange(this.handleStartWithUppercase(word, americanSpelling));
      }

      const americanTitles = Object.entries(americanToBritishTitles).find(
        ([american, british]) => british === searchWord
      )?.[0];
      if (americanTitles) {
        return highlightChange(this.handleStartWithUppercase(word, americanTitles));
      }

      return word;
    };
  }
}

module.exports = Translator;

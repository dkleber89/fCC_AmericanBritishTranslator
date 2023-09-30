const chai = require('chai');

const { assert } = chai;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  const translator = new Translator();

  suite('to British English', () => {
    test('Mangoes are my favorite fruit.', () => {
      assert.equal(
        translator.translate('american-to-british', 'Mangoes are my favorite fruit.'),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });

    test('I ate yogurt for breakfast.', () => {
      assert.equal(
        translator.translate('american-to-british', 'I ate yogurt for breakfast.'),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });

    test("We had a party at my friend's condo.", () => {
      assert.equal(
        translator.translate('american-to-british', "We had a party at my friend's condo."),
        'We had a party at my friend\'s <span class="highlight">flat</span>.'
      );
    });

    test('Can you toss this in the trashcan for me?', () => {
      assert.equal(
        translator.translate('american-to-british', 'Can you toss this in the trashcan for me?'),
        'Can you toss this in the <span class="highlight">bin</span> for me?'
      );
    });

    test('The parking lot was full.', () => {
      assert.equal(
        translator.translate('american-to-british', 'The parking lot was full.'),
        'Everything looks good to me!'
      );
    });

    test('Like a high tech Rube Goldberg machine.', () => {
      assert.equal(
        translator.translate('american-to-british', 'Like a high tech Rube Goldberg machine.'),
        'Everything looks good to me!'
      );
    });

    test('To play hooky means to skip class or work.', () => {
      assert.equal(
        translator.translate('american-to-british', 'To play hooky means to skip class or work.'),
        'Everything looks good to me!'
      );
    });

    test('No Mr. Bond, I expect you to die.', () => {
      assert.equal(
        translator.translate('american-to-british', 'No Mr. Bond, I expect you to die.'),
        'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      );
    });

    test('Dr. Grosh will see you now.', () => {
      assert.equal(
        translator.translate('american-to-british', 'Dr. Grosh will see you now.'),
        '<span class="highlight">Dr</span> Grosh will see you now.'
      );
    });

    test('Lunch is at 12:15 today.', () => {
      assert.equal(
        translator.translate('american-to-british', 'Lunch is at 12:15 today.'),
        'Lunch is at <span class="highlight">12.15</span> today.'
      );
    });
  });

  suite('to American English', () => {
    test('We watched the footie match for a while.', () => {
      assert.equal(
        translator.translate('british-to-american', 'We watched the footie match for a while.'),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });

    test('Paracetamol takes up to an hour to work.', () => {
      assert.equal(
        translator.translate('british-to-american', 'Paracetamol takes up to an hour to work.'),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    });

    test('First, caramelise the onions.', () => {
      assert.equal(
        translator.translate('british-to-american', 'First, caramelise the onions.'),
        'First, <span class="highlight">caramelize</span> the onions.'
      );
    });

    test('I spent the bank holiday at the funfair.', () => {
      assert.equal(
        translator.translate('british-to-american', 'I spent the bank holiday at the funfair.'),
        'I spent the bank holiday at the <span class="highlight">carnival</span>.'
      );
    });

    test('I had a bicky then went to the chippy.', () => {
      assert.equal(
        translator.translate('british-to-american', 'I had a bicky then went to the chippy.'),
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
      );
    });

    test("I've just got bits and bobs in my bum bag.", () => {
      assert.equal(
        translator.translate('british-to-american', "I've just got bits and bobs in my bum bag."),
        'Everything looks good to me!'
      );
    });

    test('The car boot sale at Boxted Airfield was called off.', () => {
      assert.equal(
        translator.translate('british-to-american', 'The car boot sale at Boxted Airfield was called off.'),
        'Everything looks good to me!'
      );
    });

    test('Have you met Mrs Kalyani?', () => {
      assert.equal(
        translator.translate('british-to-american', 'Have you met Mrs Kalyani?'),
        'Have you met <span class="highlight">Mrs.</span> Kalyani?'
      );
    });

    test("Prof Joyner of King's College, London", () => {
      assert.equal(
        translator.translate('british-to-american', "Prof Joyner of King's College, London"),
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London'
      );
    });

    test('Tea time is usually around 4 or 4.30.', () => {
      assert.equal(
        translator.translate('british-to-american', 'Tea time is usually around 4 or 4.30.'),
        'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
      );
    });
  });

  suite("Highlight translation", () => {
    test('Mangoes are my favorite fruit.', () => {
      assert.equal(
        translator.translate('american-to-british', 'Mangoes are my favorite fruit.'),
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
    });

    test('I ate yogurt for breakfast.', () => {
      assert.equal(
        translator.translate('american-to-british', 'I ate yogurt for breakfast.'),
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
    });

    test("We watched the footie match for a while.", () => {
      assert.equal(
        translator.translate('british-to-american', "We watched the footie match for a while."),
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
    });

    test('Paracetamol takes up to an hour to work.', () => {
      assert.equal(
        translator.translate('british-to-american', 'Paracetamol takes up to an hour to work.'),
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
    }); 
  });
});

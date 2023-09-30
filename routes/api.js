const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    const { locale, text } = req.body;

    if (typeof locale === 'undefined' || typeof text === 'undefined') {
      res.json({ error: 'Required field(s) missing' });

      return;
    }

    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      res.json({ error: 'Invalid value for locale field' });

      return;
    }

    if (!text) {
      res.json({ error: 'No text to translate' });

      return;
    }

    res.json({ text, translation: translator.translate(locale, text) });
  });
};

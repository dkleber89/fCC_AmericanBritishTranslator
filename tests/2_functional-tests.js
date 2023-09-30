const chai = require('chai');
const chaiHttp = require('chai-http');

const { assert } = chai;
const server = require('../server.js');

chai.use(chaiHttp);

const Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('Translation with text and locale fields: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'british-to-american', text: 'We watched the footie match for a while.' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          text: 'We watched the footie match for a while.',
          translation: 'We watched the <span class="highlight">soccer</span> match for a while.',
        });

        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-bri', text: 'Fish is good to eat!' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid value for locale field' });

        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });

        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ text: 'Fish is good to eat!' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Required field(s) missing' });

        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british', text: '' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'No text to translate' });

        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', done => {
    chai
      .request(server)
      .keepOpen()
      .post('/api/translate')
      .send({ locale: 'american-to-british', text: 'Fish is good to eat!' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { text: 'Fish is good to eat!', translation: 'Everything looks good to me!' });

        done();
      });
  });
});

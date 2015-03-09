var myStepDefinitionsWrapper = function () {
  this.World = require("../support/world.js").World; // overwrite default World constructor

  this.Given(/^I am a "(.*)" on the player test app in "english"$/, function(user, callback) {

    this.useUser(user);
    this.visit(this.getPage('player-tester'), callback);
  });

  this.Then(/^I should see the quizz player$/, function(callback) {
    var quizzPlayer = this.browser.query('mq-player');

    if (!quizzPlayer) {
      callback.fail(new Error('No mq-player node found'));
    }

    callback();
  });

  this.Then(/^I should see "(.*)" in the quizz player$/, function(value, callback) {
    var i, found = false,
        texts = this.browser.queryAll('span, h1, h2, h3, h4, h5, p', this.browser.query('mq-player'));

    for (i=0; i<texts.length; i++) {
      if (this.browser.text(texts[i]) == value) {
        found = true;
      }
    }

    if (!found) {
      callback.fail(new Error('No text "' + value + '" found in mq-player'));
    }

    callback();
  });
};

module.exports = myStepDefinitionsWrapper;
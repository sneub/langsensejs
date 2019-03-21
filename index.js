const Ruleset = require('./ruleset');
const {PointsList, OrderedTupleDict} = require('./utils');

class Langsense {

  /**
   * Detect the language of a string
   * @param {string} string - the string to analyse
   */
  detect(string) {
    string = string.toLowerCase();

    const shortlists = {
      char: this.charShortlist(string),
      rules: this.ruleShortlist(string),
      segments: this.segmentShortlist(string),
      words: this.wordShortlist(string),
    };

    const result = {};

    for (const sl in shortlists) {
      const shortlist = shortlists[sl];

      for (const lang in shortlist) {
        result[lang] = result[lang] ?
                       result[lang] + shortlist[lang] :
                       shortlist[lang];
      }
    }

    const orderedTuple = new OrderedTupleDict(result);
    return orderedTuple.get();
  }

  /**
   * Do analysis of string based only on individual characters
   * @param {string} string - the string to analyse
   */
  charShortlist(string) {
    const uniqueChars = new Set();
    const langs = new PointsList();

    // Look for characters that are in the language alphabets
    // to create a shortlist of potential languages
    for (const char of [...string]) {
      for (const lang in Ruleset.alphabets) {
        const alphabet = Ruleset.alphabets[lang];
        if (alphabet.indexOf(char) >= 0) {
          langs.addItem(lang);
          uniqueChars.add(char);
        }
      }
    }

    // Remove any shortlist languages where other characters do NOT appear 
    for (const lang of langs.getList()) {
      for (const char of [...uniqueChars]) {
        if (Ruleset.alphabets[lang].indexOf(char) < 0) {
          langs.removeItem(lang);
        }
      }
    }

    return langs.tallyPoints(Ruleset.weight.char);
  }

  /**
   * Do analysis of string based only on word rules
   * @param {string} string - the string to analyse
   */
  ruleShortlist(string) {
    const langs = new PointsList();

    for (const lang in Ruleset.wordRules) {
      const rules = Ruleset.wordRules[lang];

      for (const rule of rules) {
        const match = string.match(rule);
        if (match) {
          // N = number of matches, add lang with N points
          langs.addItem(lang, match.length);
        }
      }
    }
    return langs.tallyPoints(Ruleset.weight.rule);
  }

  /**
   * Do analysis of string based only on word segments
   * @param {string} string - the string to analyse
   */
  segmentShortlist(string) {
    const langs = new PointsList();

    for (const lang in Ruleset.wordSegments) {
      const segments = Ruleset.wordSegments[lang];

      for (const segment of segments) {
        const occurences = string.split(segment).length - 1;

        // N = number of occurences of segment, add lang with N points
        if (occurences > 0) {
          langs.addItem(lang, occurences);
        }
      }
    }

    return langs.tallyPoints(Ruleset.weight.segment);
  }

  /**
   * Do analysis of string based only on common words
   * @param {string} string - the string to analyse
   */
  wordShortlist(string) {
    const langs = new PointsList();

    for (const lang in Ruleset.words) {
      const words = Ruleset.words[lang];

      for (const word of words) {
        const occurences = string.split(' ').filter(w => w === word).length;

        if (occurences > 0) {
          langs.addItem(lang, occurences);
        }
      }
    }

    return langs.tallyPoints(Ruleset.weight.word);
  }
}

module.exports = Langsense;
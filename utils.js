class PointsList {
  constructor() {
    this.items = [];
  }

  /**
   * Adds n (or 1) occurrences of item to the tracker.
   * @param {string} item - name of item to track
   * @param {number} n - optional number of occurrences. Default to 1
   */
  addItem(item, n) {
    if (! n) {
      n = 1;
    }

    for (let i = 0; i < n; i++) {
      this.items.push(item);
    }
  }

  /**
   * Removes all occurrences of item from tracker
   * @param {string} item - name of item to remove
   */
  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  /**
   * Gets a unique list of all items
   */
  getList() {
    const uniqueSet = new Set(this.items);
    return [...uniqueSet];
  }

  /**
   * Calculates the scores for all items and returns a structure
   * @param {number} weight - optional weight for scoring
   */
  tallyPoints(weight) {
    if (! weight) {
      weight = 1;
    }

    const scores = {};
    for (const item of this.items) {
      scores[item] = scores[item] ? scores[item]+weight : weight;
    }
    return scores;
  }
}

class OrderedTupleDict {
  constructor(dict) {
    this.dict = dict;
  }

  /**
   * Order the two dimensional array by second index
   * @param {list} list - list of (fake) tuples aka. list of lists
   */
  order(list) {
    return list.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else if (a[1] < b[1]) {
        return 1;
      }
      return 0;
    });
  }

  /**
   * Get the ordered list of fake tuples
   */
  get() {
    const result = [];

    for (const key in this.dict) {
      result.push([key, this.dict[key]]);
    }

    return this.order(result);
  }
}

module.exports = {
  PointsList,
  OrderedTupleDict,
};
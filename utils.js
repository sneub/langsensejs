class PointsList {
  constructor() {
    this.items = [];
  }

  /**
   * 
   * @param {String} item 
   * @param {Number} n 
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
   * 
   * @param {} item 
   */
  removeItem(item) {
    this.items = this.items.filter(i => i !== item);
  }

  /**
   * 
   */
  getList() {
    const uniqueSet = new Set(this.items);
    return [...uniqueSet];
  }

  /**
   * 
   * @param {*} weight 
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
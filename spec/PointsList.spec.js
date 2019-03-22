describe('PointsList', () => {
  const {PointsList} = require('../utils');

  it('should return empty list after initiatlization', function() {
    const pointsList = new PointsList();
    expect(pointsList.getList()).toEqual([]);
  });

  it('should be able to add an item', function() {
    const pointsList = new PointsList();
    pointsList.addItem('foo');
    expect(pointsList.getList()).toEqual(['foo']);
  });

  it('should be able to remove an item', function() {
    const pointsList = new PointsList();
    pointsList.removeItem('foo');
    expect(pointsList.getList()).toEqual([]);
  });

  it('should not disrupt other items when one is removed', function() {
    const pointsList = new PointsList();
    pointsList.addItem('foo');
    pointsList.addItem('bar');
    pointsList.addItem('moo');
    pointsList.addItem('cow');
    pointsList.removeItem('foo');
    expect(pointsList.getList()).toEqual(['bar', 'moo', 'cow']);
  });

  it('should return unique list', function() {
    const pointsList = new PointsList();
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    expect(pointsList.getList()).toEqual(['bar']);
  });

  it('should return tallied points', function() {
    const pointsList = new PointsList();
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    expect(pointsList.tallyPoints()).toEqual({'bar': 3});
  });

  it('should support multiple occurence adding', function() {
    const pointsList = new PointsList();
    pointsList.addItem('bar', 2);
    pointsList.addItem('bar', 2);
    expect(pointsList.tallyPoints()).toEqual({'bar': 4});
  });

  it('should return weighted tallied points', function() {
    const pointsList = new PointsList();
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    pointsList.addItem('bar');
    expect(pointsList.tallyPoints(0.5)).toEqual({'bar': 1.5});
  });
});

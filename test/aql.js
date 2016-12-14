var expect  = require('expect.js');
var builder = require('../');

describe('Built-In Query Types', function(){

  describe('Type: aql', function(){

    it ('should build a query { x: 1 }', function(){
      var query = builder('a-table', { x: 1 });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 == @v1 RETURN c');
      expect(query.values).eql({ v0: 'x', v1: 1 });
    });

    it ('should build a query { foo: { bar: "baz", bar2: "baz2" } }', function(){
      var query = builder('a-table', { foo: { bar: 'baz', bar2: 'baz2' } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0.@v1 == @v2 && c.@v3.@v4 == @v5 RETURN c');
      expect(query.values).eql({ v0: 'foo',
        v1: 'bar',
        v2: 'baz',
        v3: 'foo',
        v4: 'bar2',
        v5: 'baz2' });
    });

    it ('should build a query { "$lt": { "bar": 25 } }', function(){
      var query = builder('a-table', { "$lt": { "bar": 25 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 < @v1 RETURN c');
      expect(query.values).eql({ v0: 'bar', v1: 25 });
    });

    it ('should build a query { "$gt": { "baz": 39, "bart": 9 } }', function(){
      var query = builder('a-table', { "$gt": { "baz": 39, "bart": 9 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 > @v1 && c.@v2 > @v3 RETURN c');
      expect(query.values).eql({ v0: 'baz', v1: 39, v2: 'bart', v3: 9 });
    });

    it ('should build a query { "baz": { "$gt": 39}, "bart": { "$gt": 9 } }', function(){
      var query = builder('a-table', { "baz": { "$gt": 39}, "bart": { "$gt": 9 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 > @v1 && c.@v2 > @v3 RETURN c');
      expect(query.values).eql({ v0: 'baz', v1: 39, v2: 'bart', v3: 9 });
    });

    it ('should build a query { "$ne": { "some": "value" } }', function(){
      var query = builder('a-table', { "$ne": { "some": "value" } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 != @v1 RETURN c');
      expect(query.values).eql({ v0: 'some', v1: 'value' });
    });

    it ('should build a query { "some": { "$ne" : "value" } }', function(){
      var query = builder('a-table', {"some": { "$ne" : "value" }});

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 != @v1 RETURN c');
      expect(query.values).eql({ v0: 'some', v1: 'value' });
    });

    it ('should build a query { "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ] }', function(){
      var query = builder('a-table', { "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ] });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 == @v1 || (c.@v2 == @v3 || c.@v4 == @v5) RETURN c');
      expect(query.values).eql({ v0: 'a', v1: 1, v2: 'b', v3: 2, v4: 'c', v5: 3 });
    });

    it ('should build a query { "$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ] }', function(){
      var query = builder('a-table', { "$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ] });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 < @v1 && c.@v2 > @v3 RETURN c');
      expect(query.values).eql({ v0: 'a', v1: 1, v2: 'b', v3: 2 });
    });

    it ('should build a query { "v": { "$gte": 2 } }', function(){
      var query = builder('a-table', { "v": { "$gte": 2 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 >= @v1 RETURN c');
      expect(query.values).eql({ v0: 'v', v1: 2 });
    });

    it ('should build a query { "$gte": { "v": 2 } }', function(){
      var query = builder('a-table', { "$gte": { "v": 2 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 >= @v1 RETURN c');
      expect(query.values).eql({ v0: 'v', v1: 2 });
    });

    it ('should build a query { "$gte": { "v": 2 }, "$orderby": { "created": -1 } }', function(){
      var query = builder('a-table', { "$gte": { "v": 2 }, "$orderby": { "created": -1 } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 >= @v1 SORT c.@v2 DESC RETURN c');
      expect(query.values).eql({ v0: 'v', v1: 2, v2: "created" });
    });

    it ('should build a query {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published"}', function(){
      var query = builder('a-table', {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published"});

      expect(query.query).eql('FOR c IN FULLTEXT(a-table , @v0 , @v1 , @v2) FILTER c.@v3 == @v4 RETURN c');
      expect(query.values).eql({ v0: 'data',  v1: 'prefix:isis',  v2: 10,  v3: 'status',  v4: 'published' });
    });

    it ('should build a query {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published","$orderby":{"created":-1}}', function(){
      var query = builder('a-table', {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published","$orderby":{"created":-1}});

      expect(query.query).eql('FOR c IN FULLTEXT(a-table , @v0 , @v1 , @v2) FILTER c.@v3 == @v4 SORT c.@v5 DESC RETURN c');
      expect(query.values).eql({ v0: 'data',  v1: 'prefix:isis',  v2: 10,  v3: 'status',  v4: 'published',  v5: 'created' });
    });

    it ('should build a query { "foobar": { "x": { "y": { "$or": [ { "z": "å" }, { "z": "ä" }, { "z": "ö" } ] } } } }', function(){
      var query = builder('a-table', { "foobar": { "x": { "y": { "$or": [ { "z": "å" }, { "z": "ä" }, { "z": "ö" } ] } } } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0.@v1.@v2.@v3 == @v4 || c.@v5.@v6.@v7.@v8 == @v9 || c.@v10.@v11.@v12.@v13 == @v14 RETURN c');
      expect(query.values).eql({ v0: 'foobar', v1:'x',v2: 'y',v3: 'z',v4: 'å',v5: 'foobar',v6: 'x',v7: 'y',v8: 'z',v9: 'ä',v10: 'foobar',v11: 'x',v12: 'y',v13: 'z',v14: 'ö' });
    });


    it ('should build a query { "_key": { "$in": [ "abc", "def" ] } }', function(){
      var query = builder('a-table', { _key: { "$in": [ "abc", "def" ] } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 IN @v1 RETURN c');
      expect(query.values).eql({ v0: '_key', v1: [ "abc", "def" ] });
    });


    it ('should build a query { "_type": { "$ne": null } }', function(){
      var query = builder('a-table', { "_type": { "$ne": null } });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 != null RETURN c');
      expect(query.values).eql({ v0: "_type" });
    });

    it ('should build a query { "_key": { "$in": [ "abc", "def" ] }, "_type": { "$ne": null } }', function(){
      var query = builder('a-table', { "_key": { "$in": [ "abc", "def" ] }, "_type": { "$ne": null } });

      expect(query.query).eql('FOR c IN a-table FILTER (c.@v0 IN @v1) && c.@v2 != null RETURN c');
      expect(query.values).eql({ v0: '_key', v1: ['abc', 'def'], v2: '_type' });
    });

    it ('should build a query { "_key": [ "abc", "def" ] }', function(){
      var query = builder('a-table', { "_key": [ "abc", "def" ] });

      expect(query.query).eql('FOR c IN a-table FILTER c.@v0 == @v1 && c.@v2 == @v3 RETURN c');
      expect(query.values).eql({ v0: '_key', v1: 'abc', v2: '_key', v3: 'def' });
    });

  });
});

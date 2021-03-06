var expect  = require('expect.js');
var builder = require('../');

describe('Built-In Query Types', function(){

  describe('Type: aql', function(){

    it ('should build a query { x: 1 }', function(){
      var query = builder('users', { x: 1 });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 == @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'x', v2: 1 });
    });

    it ('should build a query { foo: { bar: "baz", bar2: "baz2" } }', function(){
      var query = builder('users', { foo: { bar: 'baz', bar2: 'baz2' } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1.@v2 == @v3 && c.@v4.@v5 == @v6 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'foo',
        v2: 'bar',
        v3: 'baz',
        v4: 'foo',
        v5: 'bar2',
        v6: 'baz2' });
    });

    it ('should build a query { "$lt": { "bar": 25 } }', function(){
      var query = builder('users', { "$lt": { "bar": 25 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 < @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'bar', v2: 25 });
    });

    it ('should build a query { "$gt": { "baz": 39, "bart": 9 } }', function(){
      var query = builder('users', { "$gt": { "baz": 39, "bart": 9 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 > @v2 && c.@v3 > @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'baz', v2: 39, v3: 'bart', v4: 9 });
    });

    it ('should build a query { "baz": { "$gt": 39}, "bart": { "$gt": 9 } }', function(){
      var query = builder('users', { "baz": { "$gt": 39}, "bart": { "$gt": 9 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 > @v2 && c.@v3 > @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'baz', v2: 39, v3: 'bart', v4: 9 });
    });

    it ('should build a query { "$ne": { "some": "value" } }', function(){
      var query = builder('users', { "$ne": { "some": "value" } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 != @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'some', v2: 'value' });
    });

    it ('should build a query { "some": { "$ne" : "value" } }', function(){
      var query = builder('users', {"some": { "$ne" : "value" }});

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 != @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'some', v2: 'value' });
    });

    it ('should build a query { "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ] }', function(){
      var query = builder('users', { "$or": [ { "a" : 1 }, { "b" : 2, "c": 3 } ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 == @v2 || (c.@v3 == @v4 && c.@v5 == @v6) RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'a', v2: 1, v3: 'b', v4: 2, v5: 'c', v6: 3 });
    });

    it ('should build a query { "$or": [ [ { "a" : 1 }, { "b" : 2 } ], [ { "c" : 3 }, { "d": 4 } ] ] }', function(){
      var query = builder('users', { "$or": [ [ { "a" : 1 }, { "b" : 2 } ], [ { "c" : 3 }, { "d": 4 } ] ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER (c.@v1 == @v2 && c.@v3 == @v4) || (c.@v5 == @v6 && c.@v7 == @v8) RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'a', v2: 1, v3: 'b', v4: 2, v5: 'c', v6: 3, v7: 'd', v8: 4 });
    });

    it ('should build a query { "$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ] }', function(){
      var query = builder('users', { "$and": [ { "$lt" : { "a" : 1 } }, { "$gt": { "b" : 2 } } ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 < @v2 && c.@v3 > @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'a', v2: 1, v3: 'b', v4: 2 });
    });

    it ('should build a query { "v": { "$gte": 2 } }', function(){
      var query = builder('users', { "v": { "$gte": 2 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 >= @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'v', v2: 2 });
    });

    it ('should build a query { "$gte": { "v": 2 } }', function(){
      var query = builder('users', { "$gte": { "v": 2 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 >= @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'v', v2: 2 });
    });

    it ('should build a query { "$gte": { "v": 2 }, "$orderby": { "created": -1 } }', function(){
      var query = builder('users', { "$gte": { "v": 2 }, "$orderby": { "created": -1 } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 >= @v2 SORT c.@v3 DESC RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'v', v2: 2, v3: "created" });
    });

    it ('should build a query {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published"}', function(){
      var query = builder('users', {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published"});

      expect(query.query).eql('FOR c IN FULLTEXT(@@v0 , @v1 , @v2 , @v3) FILTER c.@v4 == @v5 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'data',  v2: 'prefix:isis',  v3: 10,  v4: 'status',  v5: 'published' });
    });

    it ('should build a query {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published","$orderby":{"created":-1}}', function(){
      var query = builder('users', {"$text":{"$search":"prefix:isis","$field":"data","$limit":10},"status":"published","$orderby":{"created":-1}});

      expect(query.query).eql('FOR c IN FULLTEXT(@@v0 , @v1 , @v2 , @v3) FILTER c.@v4 == @v5 SORT c.@v6 DESC RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'data',  v2: 'prefix:isis',  v3: 10,  v4: 'status',  v5: 'published',  v6: 'created' });
    });

    it ('should build a query { "foobar": { "x": { "y": { "$or": [ { "z": "å" }, { "z": "ä" }, { "z": "ö" } ] } } } }', function(){
      var query = builder('users', { "foobar": { "x": { "y": { "$or": [ { "z": "å" }, { "z": "ä" }, { "z": "ö" } ] } } } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1.@v2.@v3.@v4 == @v5 || c.@v6.@v7.@v8.@v9 == @v10 || c.@v11.@v12.@v13.@v14 == @v15 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'foobar', v2:'x',v3: 'y',v4: 'z',v5: 'å',v6: 'foobar',v7: 'x',v8: 'y',v9: 'z',v10: 'ä',v11: 'foobar',v12: 'x',v13: 'y',v14: 'z',v15: 'ö' });
    });


    it ('should build a query { "_key": { "$in": [ "abc", "def" ] } }', function(){
      var query = builder('users', { _key: { "$in": [ "abc", "def" ] } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 IN @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: '_key', v2: [ "abc", "def" ] });
    });

    it ('should build a query { "_key": { "$notin": [ "abc", "def" ] } }', function(){
      var query = builder('users', { _key: { "$notin": [ "abc", "def" ] } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 NOT IN @v2 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: '_key', v2: [ "abc", "def" ] });
    });


    it ('should build a query { "_type": { "$ne": null } }', function(){
      var query = builder('users', { "_type": { "$ne": null } });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 != null RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: "_type" });
    });

    it ('should build a query { "_key": { "$in": [ "abc", "def" ] }, "_type": { "$ne": null } }', function(){
      var query = builder('users', { "_key": { "$in": [ "abc", "def" ] }, "_type": { "$ne": null } });

      expect(query.query).eql('FOR c IN @@v0 FILTER (c.@v1 IN @v2) && c.@v3 != null RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: '_key', v2: ['abc', 'def'], v3: '_type' });
    });

    it ('should build a query { "_key": [ "abc", "def" ] }', function(){
      var query = builder('users', { "_key": [ "abc", "def" ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER c.@v1 == @v2 && c.@v3 == @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: '_key', v2: 'abc', v3: '_key', v4: 'def' });
    });

    it ('should build a query { $exists: "x"} }', function(){
      var query = builder('users', { $exists: "x" } );

      expect(query.query).eql('FOR c IN @@v0 FILTER NOT_NULL(c.@v1) RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'x' });
    });

    it ('should build a query { $or: [ { $exists: "x"}, { $exists: "y"} ] }', function(){
      var query = builder('users', { $or: [ { $exists: "x"}, { $exists: "y"} ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER NOT_NULL(c.@v1) || NOT_NULL(c.@v2) RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'x', v2: 'y' });
    });

    it ('should build a query { $and: [ { $exists: "x"}, { $exists: "y"} ], z: 3 }', function(){
      var query = builder('users', { $and: [ { $exists: "x"}, { $exists: "y"} ], z: 3 });

      expect(query.query).eql('FOR c IN @@v0 FILTER (NOT_NULL(c.@v1) && NOT_NULL(c.@v2)) && c.@v3 == @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'x', v2: 'y' , v3: 'z' , v4: 3 });
    });

    it ('should build a query { $and: { $or: [{ $exists: "x"}, { $exists: "y"}] }, z: 3 }', function(){
      var query = builder('users', { $and: { $or: [{ $exists: "x"}, { $exists: "y"}] }, z: 3 });

      expect(query.query).eql('FOR c IN @@v0 FILTER (NOT_NULL(c.@v1) || NOT_NULL(c.@v2)) && c.@v3 == @v4 RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'x', v2: 'y' , v3: 'z' , v4: 3 });
    });

    it ('should build a query { $or: [ { "a":1, "b": 2 }, { "x": 5, "y": 6 } ] }', function(){
      var query = builder('users', { $or: [ { "a":1, "b": 2 }, { "x": 5, "y": 6 } ] });

      expect(query.query).eql('FOR c IN @@v0 FILTER (c.@v1 == @v2 && c.@v3 == @v4) || (c.@v5 == @v6 && c.@v7 == @v8) RETURN c');
      expect(query.values).eql({ '@v0': "users", v1: 'a', v2: 1, v3: 'b', v4: 2, v5: 'x', v6: 5, v7: 'y', v8: 6 });
    });

  });
});

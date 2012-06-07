This kind is designed to help in using localStorage as a db. It also helps in porting kinds using db8 in enyo 1.0.

Instantiate using: 
{kind: "jsdatabase", name: "db1", published: {database: ""}, onFailure: "dbFailure", onDel: "deleteResp",
 onMake: "makeSuccess", onInsert: "insertResp", onFind: "findmarkResponse"}

See the example in jsfiddle @ http://jsfiddle.net/dCuUg/1/

Make calls to the db using:

insert( data in json);
delete(row number);
find() or find(name in db, data looking for);
make(database name);



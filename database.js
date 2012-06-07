enyo.kind({
name: "jsdatabase",
kind: "Component", 
create: function() {
this.inherited(arguments);
},
published: {
databasename: "",
id: ""
},
events: {
onFailure: "",
onMake: "",
onFind: "",
onDel: "",
onInsert: ""
},
insert: function(data) {
var currentdata = window.localStorage[this.databasename];
if (currentdata == "ready" || currentdata == "") {
currentdata = "";
newdata = enyo.json.stringify(data);
window.localStorage[this.databasename] = "[" + newdata + "]";
}
else {
currentdata = enyo.json.parse(window.localStorage[this.databasename]);

currentdata.push(data);
console.log(enyo.json.stringify(currentdata));

window.localStorage[this.databasename] = enyo.json.stringify(currentdata);
}
//var id = '{"' + num + '" :' +  enyo.json.stringify(data) + "}";
//var newdata = enyo.mixin(currentdata, data);  //enyo.json.parse(id)

this.doInsert({response: "Inserted"});
},
delete: function(data) {
var currentdata = enyo.json.parse(window.localStorage[this.databasename]);
currentdata.splice(data,1);
window.localStorage[this.databasename] = enyo.json.stringify(currentdata);
this.doDel({response: "Deleted."});
},
find: function(data, key) {
if (data == "" || data == undefined) {
var currentdata = window.localStorage[this.databasename];
if (currentdata == "ready" || currentdata == "") {
this.doFind({response: "No data."});
}else {
this.doFind({response:  enyo.json.parse(window.localStorage[this.databasename])});
}
}
else {
var currentdata = enyo.json.parse(window.localStorage[this.databasename]);
for (k = 1; k < currentdata.length; ++k) { 
var fd = [];
var i =0;
if (currentdata[k][data] == key || currentdata[k][data].match(key)){
fd[i] = k;
i=i+1;
}
}
if (fd=="") {
this.doFind({response: "Nothing found."});
}
for (l=0; l<fd.length; l++) {
returndata[l] = currentdata[fd[l]];
}
this.doFind({"response": [{"data": returndata}, {"ids": fd}]});
 }
},
make: function(data) {
//window.localStorage.bookmark="";
try {
if (window.localStorage[data]) {
if (window.localStorage[data] == "ready") {
this.databasename = data;
this.doMake({response: "opened"});
return true;
}
else {
var currentdata = enyo.json.parse(window.localStorage[data]);
this.databasename = data;
this.doMake({response: "Opened"});
}
}
else {

window.localStorage[data] = "ready";
this.databasename = data;
this.doMake({response: "Created."});
}
}
catch(e) {
this.doFailure({response: "Error setting up."});
}
}
});
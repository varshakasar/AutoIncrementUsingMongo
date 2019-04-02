var mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/optcentralnode');
mongoose.connect('mongodb://localhost/test');

Schema = mongoose.Schema;

var CounterSchema = Schema({
 name: {type: String, required: true},
 seq: { type: Number, default: 0 }
});

var counter = mongoose.model('autocounter', CounterSchema);

var entitySchema = mongoose.Schema({
 testvalue: {type: String},
 name:{type:String}
});

entitySchema.pre('save', function(next) {
 var doc = this;
 counter.findOneAndUpdate({name: 'inventory'}, {$inc: { seq: 1} }, function(error, counter) {
 if(error)
 return next(error);
console.log(counter);
 doc.testvalue = counter.seq;
 next();
 });
});

var entity = mongoose.model('entitySchema',entitySchema);

var couterObj = new counter({name:'inventory'})
couterObj.save((err,result)=>{
 console.log("counter");
 console.log(result);
})

 var obj = new entity({testvalue:"inventory",name:"praphul"});

 obj.save((err,result)=>{
 console.log("entity");
 console.log(err);
 console.log(result);
 })


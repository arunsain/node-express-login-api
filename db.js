const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false' ;

const connectToMongo = () =>{
mongoose.connect(mongoURL,()=>{

	console.log('mongo db connect successfully');

});

}


module.exports = connectToMongo;
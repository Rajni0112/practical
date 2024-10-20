const mongoose=require('mongoose')

let db=mongoose.connect('mongodb://localhost/practice1')

.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

module.exports=db
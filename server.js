require('dotenv').config();
const express= require('express')
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const booksroutes = require('./routes/books.routes');
const loansroutes = require('./routes/loans.routes');
const readersroutes = require('./routes/readers.routes');



app.get('/',(req,res)=>{
    res.send('Welcome to the library');
})

app.use('/api/books',booksroutes)
app.use('/api/loans',loansroutes)
app.use('/api/readers',readersroutes)


app.listen(process.env.APP_PORT,()=>{
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})
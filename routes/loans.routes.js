const express = require('express')
const router=express.Router()
var db=require('../config/database')

router.get('/',(req,res)=>{
    db.query('SELECT * FROM loans',(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while fetching loans');
        }else{
            return res.status(201).json({loans: result});
        }
    });
});

router.get('/:id',(req,res)=>{ 
    const id = req.params.id;
    db.query('SELECT * FROM loans WHERE id = ?',[id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while fetching loan');
        }else{
            if(!result.length){
                return res.status(404).send('Loan not found');
            }
            return res.status(201).json({loan: result[0]});
        }
    });
});

router.post('/',(req,res)=>{
    const {book_id,reader_id,loan_date,due_date,return_date} = req.body;
    if(!book_id || !reader_id || !loan_date || !due_date){
        return res.status(400).send('All fields are required');
    }
    db.query('INSERT INTO loans (book_id,reader_id,loan_date,due_date,return_date) VALUES (?,?,?,?,?)',[book_id,reader_id,loan_date,due_date,return_date],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while adding loan');
        }else{
            return res.status(201).json({message:'Loan created successfully'});
        }
    });
});

module.exports=router
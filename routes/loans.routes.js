const express = require('express')
const router=express.Router()
var db=require('../config/database')

//get loans with book names and reader names

router.get('/',(req,res)=>{
    db.query('SELECT loans.*, books.title AS book_title, readers.name AS reader_name FROM loans INNER JOIN books ON loans.book_id = books.id INNER JOIN readers ON loans.reader_id = readers.id',(err,result)=>{
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

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const {book_id,reader_id,loan_date,due_date,return_date} = req.body;
    if(!book_id || !reader_id || !loan_date || !due_date){
        return res.status(400).send('All fields are required');
    }
    db.query('UPDATE loans SET book_id = ?, reader_id = ?, loan_date = ?, due_date = ?, return_date = ? WHERE id = ?',[book_id,reader_id,loan_date,due_date,return_date,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating loan');
        }else{
            return res.status(201).json({message:'Loan updated successfully'});
        }
    });
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM loans WHERE id = ?',[id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while deleting loan');
        }else{
            return res.status(201).json({message:'Loan deleted successfully'});
        }
    });
});
//visszahozás dátumának rögzítése
router.patch('/:id/return',(req,res)=>{
    const id = req.params.id;
    const {return_date} = req.body;
    if(!return_date){
        return res.status(400).send('Return date is required');
    }
    db.query('UPDATE loans SET return_date = ? WHERE id = ?',[return_date,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating loan return date');
        }else{
            return res.status(201).json({message:'Loan return date updated successfully'});
        }
    });
});

module.exports=router
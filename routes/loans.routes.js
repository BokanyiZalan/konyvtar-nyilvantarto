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
            return res.status(201).json(result);
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
            return res.status(201).json(result[0]);
        }
    });
});

router.post('/',(req,res)=>{
    const {book_id,reader_id,loan_date,due_date,return_date,available} = req.body;
    if(!book_id || !reader_id || !loan_date || !due_date){
        return res.status(400).send('All fields are required');
    }
    if(return_date && new Date(return_date) < new Date(loan_date)){
        return res.status(400).send('Return date cannot be before loan date');
    }
    if(return_date && new Date(return_date) > new Date(due_date)){
        return res.status(400).send('Return date cannot be after due date');
    }
    
    if(return_date && new Date(return_date) < new Date()){
        return res.status(400).send('Return date cannot be in the past');
    }
    if(available === undefined){
        return res.status(400).send('Availability is required');
    }
    db.query('INSERT INTO loans (book_id,reader_id,loan_date,due_date,return_date) VALUES (?,?,?,?,?)',[book_id,reader_id,loan_date,due_date,return_date],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while adding loan');
        }else{
           
            db.query('UPDATE books SET available = 0 WHERE id = (SELECT book_id FROM loans WHERE id = ?)',[result.insertId],(err,result)=>{
                if(err){
                    console.error(err);
                    return res.status(500).send('Error occurred while updating book availability');
                }else{
                    return res.status(201).json({message:'Loan created successfully and its availability is updated'});
                }
            });
        }
    });
});

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const {book_id,reader_id,loan_date,due_date,return_date} = req.body;
    if(!book_id || !reader_id || !loan_date || !due_date){
        return res.status(400).send('All fields are required');
    }
    if(return_date && new Date(return_date) < new Date(loan_date)){
        return res.status(400).send('Return date cannot be before loan date');
    }
    if(return_date && new Date(return_date) > new Date(due_date)){
        return res.status(400).send('Return date cannot be after due date');
    }
    if(return_date && new Date(return_date) < new Date()){
        return res.status(400).send('Return date cannot be in the past');
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
//return date update
router.patch('/:id/return',(req,res)=>{
    const id = req.params.id;
    const {return_date,available} = req.body;
    if(!return_date || !available){
        return res.status(400).send('Return date and availability are required');
    }
    db.query('UPDATE loans SET return_date = ? WHERE id = ?',[return_date,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating loan return date');
        }else{
            db.query('UPDATE books SET available = ? WHERE id = (SELECT book_id FROM loans WHERE id = ?)',[available,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating book availability');
        }else{
            return res.status(201).json({message:'Loan return date updated successfully and its availability is updated'});
        }
    });
        }
    });
    
})
module.exports=router
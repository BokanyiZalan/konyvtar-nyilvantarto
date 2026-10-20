const express = require('express')
const router=express.Router()
var db=require('../config/database')
//get all books

router.get('/',(req,res)=>{
    db.query('SELECT * FROM books',(err,result)=>{
        if(err){
            console.error(err);
            res.status(500).send('Error occurred while fetching books');
        }else{
            res.json(result);
        }
    });
});
//get specific book by ID
router.get('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM books WHERE id = ?',[id],(err,result)=>{
        if(!id){
            return res.status(404).send('ID is required');
            
        }
        if(!result.length){
            return res.status(404).send('Book not found');
            
        }
        if(err){
            console.error(err);
           return res.status(500).send('Error occurred while fetching book');
        }else{
            return res.status(201).json({result: result[0]});
        }
        
    });
});
//add new book
router.post('/',(req,res)=>{
    const {title,author,category,publish_year,available} = req.body;
    db.query('INSERT INTO books (title,author,category,publish_year,available) VALUES (?,?,?,?,?)',[title,author,category,publish_year,available],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while adding book');
        }else{
            return res.status(201).json({message:'Book created successfully'});
        }
    });
});
//modify book by ID
router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const {title,author,category,publish_year,available} = req.body;
    db.query('UPDATE books SET title = ?, author = ?, category = ?, publish_year = ?, available = ? WHERE id = ?',[title,author,category,publish_year,available,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating book');
        }else{
            return res.status(201).json({message:'Book updated successfully'});
        }
    });
});
//delete book by ID
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    const checkQuery = 'SELECT * FROM loans WHERE book_id = ?';

    db.query(checkQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error occurred while checking loans');
        }
        if (result.length > 0) {
            return res.status(400).send('Cannot delete book with active loans');
        }
        db.query('DELETE FROM books WHERE id = ?',[id],(err,result)=>{
            if(err){
                console.error(err);
                return res.status(500).send('Error occurred while deleting book');
            }else{
                return res.status(201).json({message: 'Book deleted successfully'});
            }
        });
    });
})
        
         
           


module.exports=router
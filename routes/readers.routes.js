const express = require('express')
const router=express.Router()
var db=require('../config/database')

router.get('/',(req,res)=>{
    db.query('SELECT * FROM readers',(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while fetching readers');
        }else{
            return res.status(201).json(result);
        }
    });
});


router.get('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM readers WHERE id = ?',[id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while fetching reader');
        }else{
            if(!result.length){
                return res.status(404).send('Reader not found');
            }
            return res.status(201).json(result[0]);
        }
    });
});

router.post('/',(req,res)=>{
    const {name,email,phone,registered_at} = req.body;
    if(!name || !email || !phone || !registered_at){
        return res.status(400).send('All fields are required');
    }
    db.query('INSERT INTO readers (name,email,phone,registered_at) VALUES (?,?,?,?)',[name,email,phone,registered_at],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while adding reader');
        }else{
            return res.status(201).json({message:'Reader created successfully'});
        }
    });
});

router.put('/:id',(req,res)=>{
    const id = req.params.id;
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).send('All fields are required');
    }
    db.query('UPDATE readers SET name = ?, email = ?, phone = ? WHERE id = ?',[name,email,phone,id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while updating reader');
        }else{
            if(!result.affectedRows){
                return res.status(404).send('Reader not found');
            }
            return res.status(200).json({message:'Reader updated successfully'});
        }
    });
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    db.query('DELETE FROM readers WHERE id = ?',[id],(err,result)=>{
        if(err){
            console.error(err);
            return res.status(500).send('Error occurred while deleting reader');
        }else{
            if(!result.affectedRows){
                return res.status(404).send('Reader not found');
            }
            return res.status(200).json({message:'Reader deleted successfully'});
        }
    });
});




module.exports=router
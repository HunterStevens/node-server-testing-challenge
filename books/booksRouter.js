const router = require('express').Router();
const books = require('./booksModel');

router.get('/', (req,res)=>{
    books.getAll().then(list =>{
        res.status(200).json(list);
    }).catch(err=>{res.status(500).json(err.message)});
})

router.post('/', (req,res)=>{
    const {title, author} = req.body;
    if(title && author){
        books.addBook(req.body).then(newBook =>{
            res.status(200).json({data:newBook});
        }).catch(err =>{
            res.status(500).json(err.message);
        })
    }else{
        res.status(404).json({error:'credentials arent filled in to make a new book'});
    }
})

router.delete('/:id', (req,res)=>{
    const {id} = req.params;
    books.deleteBook(id).then(removed =>{
        if(removed){
            res.status(200).json({message:"book was removed"});
        }else{
            res.status(404).json({message:"Could not find book with that id"});
        }
    }).catch(err =>{
        res.status(500).json(err.message);
    })
})

module.exports = router;
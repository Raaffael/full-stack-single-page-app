const express = require('express');
const app = express();
const {Client} = require('pg');
app.use(express.json());
const PORT = 3000;
//const cors = require('cors');

const connectionString = 'postgresql://postgres:docker@127.0.0.1:5432/items';
const client = new Client({
    connectionString: connectionString
})
client.connect();

app.get('/items', function(req,res,next){
    getAllItems(req,res,next);
})
app.get('/items/:id',function(req,res,next){
    getOneItem(req,res,next);
})
app.post('/items',function(req,res,next){
    postItem(req,res,next);
})
app.patch('/items/:id',function(req,res,next){
    patchItem(req,res,next);
})
app.delete('/items/:id',function(req,res,next){
    deleteItem(req,res,next);
})



app.get('*', function (req, res, next) {
    next({ status: 404, message: 'Not Found' })
})
app.use(function (e, req, res, next) {
    res.status(e.status).json({ error: e })
})
// app.use(cors({
//     origin:'*'
// }));
app.listen(PORT, function () {
    console.log(`server is running on ${PORT}`);
})

async function getAllItems(req,res,next){
    try {
        const result = await client.query('SELECT * FROM items;');
        console.log(result.rows);
        res.send(result.rows);
    } catch (error) {
        next(error);
    }
}
async function getOneItem(req, res, next) {
    try {
        const id = req.params.id;
        const result = await client.query('SELECT * FROM items WHERE id = $1;',[id]);
        console.log(result.rows.length);
        if (result.rows.length === 0) {
            return next({ status: 404, message: 'Not Found' })
        }
        res.send(result.rows);
    } catch (error) {
        next(error)
    }
}
async function postItem(req,res,next){
    try {
        const itemToAdd = req.body;
        const values = [itemToAdd.name,itemToAdd.price];
        const text = 'INSERT INTO items (name,price) VALUES($1,$2) RETURNING *';
        const result = await client.query(text,values);
        console.log(result.rows);
        res.send(result.rows)
    } catch (error) {
        next(error)
    }
}
async function patchItem(req,res,next){
    try {
        const itemToPatch = req.body;
        let price = itemToPatch.price;
        let name = itemToPatch.name;
        if(price!==undefined&&!isNaN(price)){
            const text = 'UPDATE items SET price=$1 WHERE id=$2 RETURNING *';
            const values = [price,req.params.id];
            const result = await client.query(text,values);
            console.log(result.rows);
            res.send(result.rows);
        }else if(name!==undefined){
            const text = 'UPDATE items SET name=$1 WHERE id=$2 RETURNING *';
            const values = [name,req.params.id];
            const result = await client.query(text,values);
            console.log(result.rows);
            res.send(result.rows);
        }
    } catch (error) {
        next(error);
    }
}
async function deleteItem(req,res,next){
    try {
        const value = [req.params.id];
        const dataToDelete = await client.query('SELECT * FROM items WHERE id=$1',value)
        const text = 'DELETE FROM items WHERE id =$1';
        const result = await client.query(text,value);
        console.log(dataToDelete.rows);
        res.send(dataToDelete.rows);
    } catch (error) {
       next(error);
    }
}

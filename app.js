let express = require('express')
let mysql = require('mysql')

let bodyParser = require('body-parser')
let PORT = process.env.PORT || 3050
let app = express() 
app.use(bodyParser.json())
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'node_mysql'
  });
//rutas
app.get('/',(req, res)=>{
    res.send('Test inicial')
})
app.get('/customers', (req,res)=>{
    let sql = 'SELECT * FROM invitados';
    connection.query(sql,(error,results)=>{
        if (error) throw error;
        if (results.length > 0) {
            res.json(results)
        } {
            res.send('No se obtuvo respuesta')
        }
    })
})
app.get('/customers/:id', (req,res)=>{
    let {id} = req.params
    let sql = `SELECT * FROM invitados WHERE id = ${id}`;
    connection.query(sql,(error,result)=>{
        if (error) throw error;
        if (result.length > 0) {
            res.json(result)
        } {
            res.send('Usuario no encontrado')
        }
    })
})
app.post('/add',(req,res)=>{
    let sql = 'INSERT INTO invitados set  ?'
    let customerObj = {
        nombre: req.body.nombre,
        ciudad: req.body.ciudad 
    }
    connection.query(sql, customerObj, err =>{
        if(error)throw error;
        res.send('Registro insertado')
    })
})
app.put('/update/:id',(req,res)=>{
    let {id} = req.params
    let {nombre, ciudad} = req.body
    let sql = `UPDATE invitados SET nombre = $'{nombre}',ciudad = $'{ciudad}' WHERE id = ${id}`;

    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Registro actualizado')
    })
})
app.delete('/delete/:id',(req,res)=>{
    let {id} = req.params
    let sql = `DELETE FROM invitados WHERE id = ${id}`

    connection.query(sql, error =>{
        if(error) throw error;
        res.send('Registro actualizado')
    })
})
connection.connect(error =>{
    if(error)throw error;
    console.log('DB conectada correctamente')
});
app.listen(PORT,()=>console.log(`Servidor activo en puerto ${PORT}`))
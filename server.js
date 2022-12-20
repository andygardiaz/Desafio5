/*
Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.

En detalle, que incorpore las siguientes rutas:
GET '/api/productos' -> devuelve todos los productos.
GET '/api/productos/:id' -> devuelve un producto según su id.
POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
DELETE '/api/productos/:id' -> elimina un producto según su id.

Para el caso de que un producto no exista, se devolverá el objeto:
{ error : 'producto no encontrado' }
Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.
*/

const express = require('express')

const productRouter = require('./routes/productRouter')

const ProductClass = require('./class/productsClass')
const products = new ProductClass('./data/products.txt')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//----------------------

app.set('views', './views')

const motorPlantillas = 'ejs'
// Motor de plantillas a utilizar
app.set('view engine', motorPlantillas)


// Plantillas 
app.get('/', (req, res) => {
  res.render('ejs/form.ejs')
})

app.get('/productos', async (req, res) => {
  let productos = await products.getAll()
  res.render('ejs/table.ejs', { productos })
})



//----------------------

/* API ROUTER productRouter */
app.use('/api', productRouter)




//-----------------------

const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
)

server.on('error', err => console.log(`Error: ${err}`));

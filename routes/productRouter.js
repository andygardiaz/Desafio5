const express = require('express')

const { Router } = express    /**/
const productRouter = Router() /* const productRoute = require('express').Router() */

const ProductClass = require('../class/productsClass')
const products = new ProductClass('./data/products.txt')


/* ------- router productos -------- */
/*get productos*/
productRouter.get('/productos', async (req, res) => {
  const allProducts = await products.getAll()
  res.json( allProducts )
})

/*get producto segun id*/
productRouter.get('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const product = await products.getById( id )
  product ? res.json( product )
    : res.status(404).send({ error: 'producto no encontrado'})
})

/*post producto*/
productRouter.post('/productos', async (req, res) => {
  const productToAdd = req.body
  await products.save( productToAdd )
  res.redirect('/')
})


/*put producto*/
productRouter.put('/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const productToModify = req.body

  if(await products.getById( id )){
    let allProducts = await products.getAll()
    allProducts[ id - 1 ] = {"id": id, ...productToModify}
    products.saveFile( allProducts )
    res.send({ productToModify })
  } else {
    res.status(404).send({ error: 'id no valido'})
  }
})


/*delete producto*/
productRouter.delete('/productos/:id', async (req, res) => {
  const id = req.params.id
  const productToDelete = await products.getById( id )

  if (productToDelete) {
    await products.deleteById( id )
    res.send({ borrado: productToDelete})
  } else {
    res.status(404).send({ error: 'producto no encontrado'})
  }
})



module.exports = productRouter
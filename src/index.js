import Express from 'express'
import Monk from 'monk'
import Parser from 'body-parser'

const db = Monk('mongodb://tylergarlick:orange5@ds044709.mlab.com:44709/order-management')
const products = db.get('products')

const app = Express()
app.use(Parser.json())


const a = { name: 'Tyler' }
const b = { name: 'Wes', isAwesome: true }

const blah = { ...a, ...b }
console.log(blah)


app.get('/products', async (req, res) => {
  const results = await products.find()
  return res.json(results)
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const result = await products.findOne(id)
  return res.json(result)
})

app.post('/products', async (req, res) => {
  const product = req.body
  const result = await products.insert(product)
  return res.json(result)
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = req.body

  let result = await products.findOne(id)
  result = await products.findOneAndUpdate(id, { ...result, ...product })

  return res.json(result)
})

app.del('/products/:id', async (req, res) => {
  const { id } = req.params
  const result = await products.findOneAndDelete(id)
  return res.json(result)
})


app.listen(3000)

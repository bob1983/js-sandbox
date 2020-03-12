import express from 'express'
const app = express()
const port = parseInt(process.env.PORT || '3000')

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(port, () => console.log(`Listening on port ${port}`) )


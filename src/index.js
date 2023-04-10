import express from 'express'
import { DwnHelper } from './utils/dwn.js'
import { Wallet } from './services/wallet.js'
let dwn = new DwnHelper()
await dwn.init()

const PORT = process.env.PORT || 3002
const app = express()
app.use(express.json());

const wallet = new Wallet()
wallet.init(app, dwn, PORT)


app.use('/health', (req,res) => {
    res.send('ok')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(app._router.stack)
})




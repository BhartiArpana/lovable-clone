import express from 'express'
import morgan from 'morgan'
import fs from 'fs'

const app = express()
const WORKING_DIR = '/workspace'

app.use(morgan('dev'))

app.get("/",(req,res)=>{
    res.status(200).json({
        message:'Hello from sandbox agent',
        status:'success'
    })
})

app.get('/list-files',async(req,res)=>{
    const element = await fs.promises.readdir(WORKING_DIR)

    res.status(200).json({
        message:'elements in working directory',
        element
    })
})

export default app
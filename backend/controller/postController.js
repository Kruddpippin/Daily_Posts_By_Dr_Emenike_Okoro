const express = require('express')
const app = express()
const fs = require('fs');

const blogRouter = app;


blogRouter.get('/', (req, res) =>{
    res.status(200).sendFile('./../')
})

// const getPost = async (req, res) =>{
// const post = {}
// }
'use strict'
const rscript = require('r-script')
const api = require('express').Router()

api.post('/convert', (req, res, next) => {
    console.assert('convert')
    rscript(`${__dirname}/convertWav.R`)
        .data(req.body)
        .call((err, output) => {
            if (err) throw err
            console.log(output)
            res.send(output)
        })
});

api.post('/converter', (req, res, next) => {
    console.assert('convert')
    rscript(`${__dirname}/converterWav.R`)
        .data(req.body)
        .call((err, output) => {
            if (err) throw err
            console.log(output)
            res.send(output)
        })
});

module.exports = api;
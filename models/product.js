const path = require('path')
const fs = require('fs')

const rootDir = require('../util/path')

const pathProductModel = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
    fs.readFile(pathProductModel, (err, fileContent) => {
        if(err){
            cb([])
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

module.exports = class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(pathProductModel, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(cb) {
        getProductsFromFile(cb)
    }
}







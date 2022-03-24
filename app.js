const express = require("express");
const db = require("./db")
const app = express();
const connection = db.getConnection();

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.post("/product", (request, response) => {
    const values = [
        request.body.name,
        request.body.qty,
        request.body.price
    ]

    try {
        db.createProduct(values)
    } catch (error) {
        console.log(error)
        return response.send("Error creating a product, please check the values and try again")
    }
    
    response.send("Product created successfully!")
})

app.get("/product", (request, response) => {
    connection.query('SELECT * FROM products', (err, rows) => {
        if (err) throw err

        if (rows.length === 0) {
            return response.send("No products registered")
        }

        response.json(rows)
    })
});

app.get("/product/:id", (request, response) => {
    const {id} = request.params

    connection.query('SELECT * FROM products WHERE id = ?', id, (err, rows) => {
        if (err) throw err

        if (rows.length === 0) {
            return response.send("No product found with id " + id)
        }

        response.json(rows)
    })
})

app.put("/product/:id", (request, response) => {
    const {id} = request.params

    const values = {}

    if (Object.keys(request.body).length === 0) {
        return response.send("Please provide values to update the product")
    }

    request.body.name ? values['name'] = request.body.name : false
    request.body.qty ? values['qty'] = request.body.qty : false
    request.body.price ? values['price'] = request.body.price : false

    try {
        db.updateProduct(id, values)
    } catch (error) {
        console.log(error)
        return response.send("Error updating a product, please check the values and try again")
    }

    response.send("Product updated successfully!")
})

app.delete("/product/:id", (request, response) => {
    const {id} = request.params

    try {
        db.deleteProduct(id)
    } catch (error) {
        console.log(error)
        return response.send("Error creating a product, please check the values and try again")
    }

    response.send("Product deleted successfully!")
})

app.listen(4002, () => console.log("Server running on port 4002"));
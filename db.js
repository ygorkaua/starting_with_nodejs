const mysql = require("mysql");
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'node_products'
});

function getConnection() {
    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
       
        console.log('connected as id ' + connection.threadId);
      });
      return connection;
}

function getProducts() {
  connection.query('SELECT * FROM products', (err, rows) => {
      if (err) throw err
  
      if (rows.length === 0) {
          return "No products registered"
      }
  
      return rows
  })
}

function createProduct(values) {
  return connection.query('INSERT INTO products(name, qty, price) VALUES (?,?,?)', values)
}

function updateProduct(id, values) {
  let sql = 'UPDATE products SET '

  for (var key in values) {
    var value = values[key]
    if (key === 'name') {
      sql += `${key}='${value}', `
    } else {
      sql += `${key}=${value}, `
    }
  }

  sql = sql.slice(0, -2)

  sql += ` WHERE id=${id}`

  return connection.query(sql)
}

function deleteProduct(id) {
  return connection.query('DELETE FROM products WHERE id=?', id)
}

module.exports = {getConnection, createProduct, updateProduct, deleteProduct}
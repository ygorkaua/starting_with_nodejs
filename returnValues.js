import { getConnection } from './db';

function getProducts() {
    getConnection().query('SELECT * FROM products', (err, rows) => {
        if (err) throw err
    
        if (rows.length === 0) {
            return "No products registered"
        }
    
        return rows
    })
}

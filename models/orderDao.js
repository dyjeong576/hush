const dataSource = require('./dataSource');


const createOrder = async (userId, reqMessage, address) => {

    await dataSource.query(`
        INSERT INTO orders (
            user_id,
            req_message,
            address
            ) VALUES (
                    ?,
                    ?,
                    ?
            )`,
        [userId, reqMessage, address]
    )

    const orderId = await dataSource.query(`
        SELECT 
            id
        FROM orders
        WHERE user_id = ?`, [userId]
        )
        return orderId[orderId.length-1].id;
}

const getCartTrue = async (userId) => {

    const items = await dataSource.query(`
        SELECT 
            product_id,
            quantity
        FROM carts
        WHERE user_id = ? AND checkbox = 1`, [userId]
    )

    return items;

  }

const createOrderItems = async (orderId, products) => {    

    for(let i=0; i<products.length; i++){
        await dataSource.query(`
        INSERT INTO order_items (
            order_id,
            product_id,
            quantity
            ) VALUES (
                    ?,
                    ?,
                    ?
            )`,
        [orderId, products[i].product_id, products[i].quantity]
        )    
    }

    return;
}

const deleteCart = async (userId, products) => {    

    for(let i=0; i<products.length; i++){
        await dataSource.query(`
        UPDATE carts
        SET quantity = quantity - ? 
        WHERE product_id = ? AND user_id = ?`,
        [products[i].quantity, products[i].product_id, userId]
        )    
    }

    await dataSource.query(`
        DELETE FROM
            carts 
        WHERE 
            quantity = 0`
    )

    return;

}

const deductPoint = async (userId, total) => {    

    return await dataSource.query(`
        UPDATE users 
        SET point = point - ? 
        WHERE id = ?`,
        [total, userId]
    )

}

const deleteProductStuck = async (products) => {    
    for(let i=0; i<products.length; i++){
        await dataSource.query(`
            UPDATE products 
            SET stock = stock - ? 
            WHERE id = ?`,
        [products[i].quantity, products[i].product_id]
        )
    }



}

module.exports = {
    createOrder,
    getCartTrue,
    createOrderItems,
    deleteCart,
    deductPoint,
    deleteProductStuck
}
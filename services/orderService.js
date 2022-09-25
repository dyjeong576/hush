const datasource = require('../models/dataSource');
const orderDao = require('../models/orderDao.js');
const queryRunner = datasource.createQueryRunner();

const createOrder = async (userId, total, reqMessage, address) => {

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try{
        const orderId = await orderDao.createOrder(userId, reqMessage, address);
        const products = await orderDao.getCartTrue(userId);
        await orderDao.createOrderItems(orderId, products);
        await orderDao.deleteProductStuck(products);
        await orderDao.deleteCart(userId, products);
        await orderDao.deductPoint(userId, total);

        await queryRunner.commitTransaction();

        await queryRunner.release();

        return;

    } catch (err) {
        await queryRunner.rollbackTransaction();
        const error = new Error('ROLLBACK' + err.message);
		error.statusCode = 400;
		throw error

    } 

}
module.exports = { 
    createOrder
}
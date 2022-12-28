import { Order, Filter } from './order.type';
import client from '../../services/database';
import dotenv from 'dotenv';
dotenv.config();
const { BYCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export class OrderStore {
  async index(f: Filter): Promise<Order[]> {
    try {
      const conn = await client.connect();
      let sql;
      let result;
      sql = 'SELECT * FROM orders where user_id=$1 ';
      result = await conn.query(sql, [f.user_id]);
      let orders = result.rows;
      console.log(f.status);

      if (f.status) {
        orders = orders.filter((order) => order.status === f.status);
      }
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`unable to list orders ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders where id = $1';
      const result = await conn.query(sql, [id]);
      let order = result.rows[0];
      if (order) {
        const sqlProd =
          'SELECT p.id,p.name,p.category,p.price,op.quantity FROM products as p ,order_product as op where op.order_id = $1 and op.product_id=p.id';
        const resultProd = await conn.query(sqlProd, [id]);
        order = { ...order, products: resultProd.rows };
      }
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable get order id:(${id}}): ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    const conn = await client.connect();
    try {
      await conn.query('BEGIN');
      const sql =
        'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.status, o.user_id]);
      const order = result.rows[0];
      const products = o.products.reduce((agg, product) => {
        const aggPrepared = agg !== '' ? `${agg},` : agg;
        return `${aggPrepared}(${order.id},${product.id},${product.quantity})`;
      }, '');

      const productSQL = `INSERT INTO order_product(order_id, product_id,quantity)
      VALUES ${products} RETURNING *`;
      const productsInserted = await conn.query(productSQL);
      await conn.query('COMMIT');
      return { ...order, products: productsInserted.rows };
    } catch (err) {
      console.log(err);
      await client.query('ROLLBACK');
      throw new Error(`unable create order : ${err}`);
    } finally {
      conn.release();
    }
  }

  async complete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'update  orders set(status) VALUES($1) RETURNING *';
      const result = await conn.query(sql, ['complete']);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`unable create order : ${err}`);
    }
  }
}

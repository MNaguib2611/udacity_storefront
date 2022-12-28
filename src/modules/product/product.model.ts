import { Product, Filter } from './product.type';
import client from '../../services/database';
import dotenv from 'dotenv';
dotenv.config();
const { BYCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export class ProductStore {
  async index(filter: Filter): Promise<Product[]> {
    try {
      const conn = await client.connect();
      let sql;
      let result;
      console.log(!filter.category);
      if (!filter.category) {
        sql = 'SELECT * FROM products';
        result = await conn.query(sql);
      } else {
        sql = 'SELECT * FROM products WHERE category LIKE $1';
        result = await conn.query(sql, [`%${filter.category}%`]);
      }
      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`unable to list products ${err}`);
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products where id = $1';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable get product id:(${id}}): ${err}`);
    }
  }
  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO products (name,category,price) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.name, p.category, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable create product (${p.name}): ${err}`);
    }
  }
  async popular(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql =
        'select p.id,p.name,p.category,SUM(op.quantity) as total ,op.product_id from products as p,order_product as op where p.id=op.product_id  GROUP BY p.id,op.product_id ORDER BY total desc limit 5';

      const result = await conn.query(sql);
      const product = result.rows;
      conn.release();
      return product;
    } catch (err) {
      console.log(err);
      throw new Error(`unable get most popular products : ${err}`);
    }
  }
}

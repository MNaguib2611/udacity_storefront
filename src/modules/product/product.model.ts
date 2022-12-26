import { Product, Filter } from './product.type';
import client from '../../services/database';
import bcrypt from 'bcrypt';
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
      const sql = 'INSERT INTO products (name,category,price) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.name, p.category, p.price]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (err) {
      throw new Error(`unable create product (${p.name}): ${err}`);
    }
  }
}

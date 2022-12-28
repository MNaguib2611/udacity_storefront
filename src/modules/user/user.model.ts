import jwt, { Secret } from 'jsonwebtoken';
import { User, UserLogin } from './user.type';
import client from '../../services/database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const { BYCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT id, firstname, lastname, username FROM users';
      const result = await conn.query(sql);

      const users = result.rows;
      conn.release();
      return users;
    } catch (err) {
      throw new Error(`unable to list users ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, firstname, lastname, username FROM users where id = $1';
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable get user id:(${id}}): ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO users (lastname,firstname,username,password) VALUES($1, $2, $3, $4) RETURNING *';
      const hash = bcrypt.hashSync(
        `${u.password}${BYCRYPT_PASSWORD}`,
        parseInt(SALT_ROUNDS as string),
      );

      const result = await conn.query(sql, [
        u.firstName,
        u.lastName,
        u.username,
        hash,
      ]);
      const user = result.rows[0];
      delete user['password'];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstName} ${u.lastName}): ${err}`,
      );
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT id, firstname, lastname, username,password FROM users where username = $1 ';
      const result = await conn.query(sql, [username]);
      const user = result.rows[0];
      const found = bcrypt.compareSync(
        `${password}${BYCRYPT_PASSWORD}`,
        user.password,
      );
      if (found) {
        delete user['password'];
        const token = jwt.sign({ user: user }, TOKEN_SECRET as Secret);
        return { ...user, token };
      } else {
        return null;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

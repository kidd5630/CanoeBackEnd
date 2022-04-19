const { Client } = require('pg');

const client = new Client('postgres://localhost:5432/canoe-dev');

async function getAllThree(){
    const { rows } = await client.query(
        `SELECT class1, class2, class3
        FROM classes;
    `);
    return rows; 
}

async function createClassList({ class1, class2, class3}){
  try{
    const { rows } = await client.query(`
      INSERT INTO classes(class1, class2, class3)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [class1, class2, class3]);
    return rows
  }catch (error){
    throw error;
  }
}


module.exports = {
  client,
  getAllThree,
  createClassList
}
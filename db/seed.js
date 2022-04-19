const {
    client,
    getAllThree,
    createClassList
} = require('./index');

async function dropTables() {
    try {
      console.log("Starting to drop tables...");
      await client.query(`
      DROP TABLE IF EXISTS classes;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }
  async function createTables() {
    try {
        console.log("Starting to build tables...");
        await client.query(`
            CREATE TABLE classes (
            id SERIAL PRIMARY KEY,
            class1 varchar(255),
            class2 varchar(255),
            class3 varchar(255)
        );
      `);
      console.log("Finished building tables!");
    } catch (error) {
      throw error;
    }
  }

  async function createInitialClassList(){
      try{
            console.log("Starting to create class lists");
            await createClassList({ class1: 'french', class2: 'calculus', class3: 'social studies'});
            await createClassList({ class1: 'phYsical Education', class2: 'CalcUlus', class3: 'computer Science'});
            await createClassList({ class1: 'CALCULUS', class2: 'Biology 101', class3: 'World History'});
            console.log("Finished creating class lists");
      } catch (error){
          console.error("Error Creating Lists");
          throw error;
      }
  }

  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialClassList();
    } catch (error) {
      throw error;
    }
  }
  
  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const classes = await getAllThree();
      console.log("getAllThree:", classes);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }
  
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
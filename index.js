
const oracledb = require('oracledb');


async function run() {

    let connection;
  
    try {
      connection = await oracledb.getConnection( {
        user          : "kiet",
        password      : "091002",
        connectString : "localhost/XE"
      });
  
      const result = await connection.execute(
        `SELECT *
       FROM Stage`
      );
      console.log(result.rows);
  
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  
  run();

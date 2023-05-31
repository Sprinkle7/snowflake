const snowflake = require('snowflake-sdk');

// Snowflake connection settings
const config = {
    account: 'https://dqb01936.prod3.us-west-2.aws.snowflakecomputing.com/',
    username: 'Kash',
    password: 'Kash@1234'
};

// Create a Snowflake Connection object
const connection = snowflake.createConnection(config);

// Establish the connection
connection.connect(function(err, conn) {
  if (err) {
    console.error('Error connecting to Snowflake: ' + err);
    return;
  }
  
  console.log('Successfully connected to Snowflake');

  // Execute a query
  const query = 'SELECT * FROM KR_TABLE';
  const options = {
    fetchAsString: ['INT', 'STRING']
  };

  conn.execute({
    sqlText: query,
    complete: function(err, stmt, rows) {
      if (err) {
        console.error('Error executing query: ' + err.message);
        return;
      }
      
      console.log('Query results:');
      console.log(rows);

      // Close the connection
      conn.destroy(function(err, conn) {
        if (err) {
          console.error('Error closing connection: ' + err.message);
        } else {
          console.log('Connection closed successfully');
        }
      });
    }
  });
});

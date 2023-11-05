var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'aadhar',
  // Add this line to specify the authentication plugin
  authSwitchHandler: function ({ pluginName, pluginData }, cb) {
    if (pluginName === 'caching_sha2_password') {
      // Use the older authentication method
      return cb(null, Buffer.from([0]));
    }
    return cb(new Error('Unsupported authentication plugin'));
  },
});

conn.connect(function (err) {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id', conn.threadId);
});

module.exports = conn;
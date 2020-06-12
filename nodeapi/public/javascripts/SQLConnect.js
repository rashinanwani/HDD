var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
// const Sequelize = require('sequelize');
var connection;
var str_data = "";

// module.exports = {
//   connect : function connect() {
//   const sequelize = new Sequelize('Server Lookup', '754725', 'Password@123', {
//   host: 'LT079861\\SQLEXPRESS',
//   dialect: 'mssql',
//     dialectOptions: {
//     driver: "ODBC Driver 13 for SQL Server", 
//     trustedConnection: "true"
//   }
// });
// sequelize.authenticate();
// }
// }

// Used to Connect to remote instance
// var config = {
//   server: "CPCINPUDV003505",
//   options: {
//     database: "testdb",
//   },
//   authentication: {
//     type: "default",
//     options: {
//       userName: "Usr1",
//       password: "1234567890",
//     }
//   }
// }; 

var config =
{
  server: "LAPTOP-DHF75SUF",
  options: {
    database: "HDDServer",
  },
  authentication: {
    type: "default",
    options: {
      userName: "Usr1",
      password: "1234567890"
    }
  },
  options: {
    encrypt: false,
    //trustedConnection:true,
    //port:1433
  }
};

// var config = {
//   server: 'lt079861azuresql.database.windows.net',
//   options: {
//     database: "testdb",
//     encrypt: true
//   },
//   authentication: {
//     type: "default",
//     options: {
//       userName: "azureuser1",
//       password: "123qweasdZXC",   
//     }
//   }
// };

module.exports = {
  connect: function connect() {
    let data = [];
    connection = new Connection(config);
    connection.on('connect', function (err, res) {

      if (err) {
        console.log('---------------------------------------------------------');
        console.log('Not Connected')
        //data.push({ Status: 'Not Connected', Message: err.message })
        //return data
      }
      else {
        // If no error, then good to go...
        console.log("Connected");
        //data.push({ Status: 'Connected' })
        //return data
      }
    });

  },

  executeStatement: function executeStatement(res) {
    let data = [];
    return new Promise((resolve, rej) => {
      request = new Request("use HDDServer;select [ServerName],[IP],[Size] from [dbo].[Server_Log]", function (err, rowCount) {
        if (err) {
          //data.push({ Type: 'Display_Server_Table_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');
        }
      });

      request.on('row', (column, err) => {
        data.push({ ServerName: column[0].value, IP: column[1].value, Size: column[2].value })
      })
      request.on('requestCompleted', function (columns) {
        return resolve(data)
        // res.json(data);
        console.log("Table Data Fetched");
      });

      connection.execSql(request);
    })

  },

  executeStatement1: function executeStatement1(res, sname, arr) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("use HDDServer;EXEC [dbo].[Compare_Tables] @Table1='Server_Table_" + sname + "',@Table2='Server_Table_" + arr + "'", function (err, rowCount) {
        if (err) {
          //data.push({ Type: 'Compare_Server_Table_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          return resolve(data);
        }
      });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, FilePath: column[1].value, SizeInBytes_A: column[2].value, SizeInBytes_B: column[3].value, ScanStamp_A: column[4].value.toGMTString(), ScanStamp_B: column[5].value.toGMTString() })
      })

      connection.execSql(request);
    })

  },

  executeStatement2: function executeStatement2(res, sname, comp_dt) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("use HDDServer;EXEC [dbo].[Graph_Compare] @MachineName='" + sname + "',@Date='" + comp_dt + "'", function (err, rowCount) {
        if (err) {
          //data.push({ Type: 'Area_Graph_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');

        }
      });

      request.on('row', (column) => {
        data.push({ Name: column[0].value, FilePath: column[1].value, SizeInBytes_A: column[2].value, SizeInBytes_B: column[3].value, ScanStamp_A: column[4].value.toString(), ScanStamp_B: column[5].value.toString(), CreationDate: column[6].value.toLocaleDateString() })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Graph Compare Data");
        return resolve(data)
      });

      connection.execSql(request);
    })

  },

  executeStatement3: function executeStatement3(res, sname) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("use HDDServer;SELECT [ServerName],[TStamp],[ServerSize] FROM [dbo].[" + sname + "GraphData]", function (err, rowCount) {
        if (err) {
          // console.log(err);
          //data.push({ Type: 'Line_Graph_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');
        }
      });

      request.on('row', (column) => {
        data.push({ Name: column[0].value, TimeStamp: column[1].value.toLocaleDateString(), SizeInBytes: column[2].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Graph History Data");
        return resolve(data)
        // res.json(data);
      });

      connection.execSql(request);
    })

  },

  executeStatement4: function executeStatement4(res, sname) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("SELECT [Name],[Creation Time],[Most recent access],[Most recent modification],[Size In Bytes],[File Path] FROM [dbo].[Server_Table_" + sname + "] WHERE [dbo].[Server_Table_" + sname + "].[File Path] LIKE '%C:\\Factory\\Backups_%'", function (err, rowCount) {
        if (err) {
          // console.log(err);
          //data.push({ Type: 'Backup_Folder_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          // console.log(request)
          console.log(rowCount + ' rows');

        }
      });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, CreationTime: column[1].value.toLocaleDateString(), Mostrecentaccess: column[2].value.toLocaleDateString(), Mostrecentmodification: column[3].value.toLocaleDateString(), SizeInBytes: column[4].value, FilePath: column[5].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Backup Data Fetched");
        return resolve(data)
        // res.json(data);
      });

      connection.execSql(request);
    })

  },

  executeStatement5: function executeStatement5(res, sname) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("SELECT [Name],[Creation Time],[Most recent access],[Most recent modification],[Size In Bytes],[File Path] FROM [dbo].[Server_Table_" + sname + "] WHERE [dbo].[Server_Table_" + sname + "].[File Path] LIKE '%C:\\Factory\\Deployments_%'", function (err, rowCount) {
        if (err) {
          // console.log(err);
          //data.push({ Type: 'Deployments_Folder_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          // console.log(request) 
          console.log(rowCount + ' rows');

        }
      });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, CreationTime: column[1].value.toLocaleDateString(), Mostrecentaccess: column[2].value.toLocaleDateString(), Mostrecentmodification: column[3].value.toLocaleDateString(), SizeInBytes: column[4].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Deployments Data Fetched");
        return resolve(data)
        // res.json(data);
      });

      connection.execSql(request);
    })

  },

  executeStatement6: function executeStatement6(res, sname) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("SELECT [Name],[Creation Time],[Most recent access],[Most recent modification],[Size In Bytes],[File Path] FROM [dbo].[Server_Table_" + sname + "] WHERE [dbo].[Server_Table_" + sname + "].[File Path]"
        + " LIKE '%C:\\User\\A909483\\AppData\\Roaming\\Deere\\MPP\\agwcprod.deere.com_%'", function (err, rowCount) {
          if (err) {
            // console.log(err);
            //data.push({ Type: 'Other_Folder_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
          } else {
            // console.log(request) 
            console.log(rowCount + ' rows');

          }
        });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, CreationTime: column[1].value.toLocaleDateString(), Mostrecentaccess: column[2].value.toLocaleDateString(), Mostrecentmodification: column[3].value.toLocaleDateString(), SizeInBytes: column[4].value, FilePath: column[5].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Random Folder Data Fetched");
        return resolve(data)
        // res.json(data);
      });

      connection.execSql(request);
    })

  },

  executeStatement7: function executeStatement7(res, sname, comp_dt) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("EXEC [dbo].[Drive_Pie_Chart] @MachineName='" + sname + "',@Date='" + comp_dt + "'", function (err, rowCount) {
        if (err) {
          console.log(comp_dt)
          // console.log(err);
          //data.push({ Type: 'Pie_Graph_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');

        }
      });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, SizeInBytes: column[1].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Drive Pie Chart Data");
        return resolve(data)
        // res.json(data); 
      });

      connection.execSql(request);
    })

  },

  executeStatement8: function executeStatement8(res) {
    let data = [];
    return new Promise((resolve, rej) => {
      request = new Request("SELECT A.[ServerName], A.[Size] ,B.[Size]- A.[Size] as Space_Left FROM [dbo].[Server_Log] as A INNER JOIN [dbo].[Server_Info] as B ON A.[ServerName] = B.[ServerName]", function (err, rowCount) {
        if (err) {
          // console.log(err);
          // data.push({ Type: 'Bar_Graph_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');
        }
      });

      request.on('row', (column) => {
        data.push({ ServerName: column[0].value, Size: column[1].value, Space_Left: column[2].value })
      })

      request.on('requestCompleted', function (columns) {
        return resolve(data)
        // res.json(data);
        console.log("Bar Graph Data Fetched");
      });

      connection.execSql(request);
    })

  },

  executeStatement9: function executeStatement9(res, sname, comp_dt) {
    let data = [];

    return new Promise((resolve, rej) => {
      request = new Request("EXEC [dbo].[Folder_Pie_Chart] @MachineName='" + sname + "',@Date='" + comp_dt + "'", function (err, rowCount) {
        if (err) {
          console.log(comp_dt)
          // console.log(err);
          //data.push({ Type: 'Folder_Pie_Graph_Data_Err', Error: 'Error', Message: err.message, Code: err.code, ServerName: err.serverName })
        } else {
          console.log(rowCount + ' rows');

        }
      });
      request.on('row', (column) => {
        data.push({ Name: column[0].value, ServerName: column[1].value, FilePath: column[2].value, SizeInBytes: column[3].value, Perc: column[4].value })
      })

      request.on('requestCompleted', function (columns) {
        console.log("Folder Pie Chart Data");
        return resolve(data)
        // res.json(data); 
      });

      connection.execSql(request);
    })

  }

}

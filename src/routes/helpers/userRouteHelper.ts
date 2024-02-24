const getAllusers = async (db_connection: any) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, username, dob, last_login FROM users"
    );
    result = result.rows;
  } catch (err) {
    console.error("(-) Error in querying with the db", err);
    return {
      status: false,
      list: [],
    };
  }
  return {
    status: true,
    list: result,
  };
};

const getUserById = async (db_connection: any, id: number) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, username, dob, last_login from users where id = $1",
      [id]
    );
    if (result.rows.length) {
      result = result.rows[0];
    } else {
      result = [];
    }
  } catch (err) {
    console.error("(-) Error in querying with the db", err);
    return {
      status: false,
      list: [],
    };
  }
  return {
    status: true,
    list: result,
  };
};

const getUserByUsername = async (db_connection: any, username: string) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, username, dob, last_login from users where username = $1",
      [username]
    );
    if (result.rows.length) {
      result = result.rows[0];
    } else {
      result = [];
    }
  } catch (err) {
    console.error("(-) Error in querying with the db", err);
    return {
      status: false,
      list: [],
    };
  }
  return {
    status: true,
    list: result,
  };
};

const setUser = async (db_connection: any, data: any) => {
  let result;
  try {
    result = await db_connection.query(
      "insert into users(name, username, password, dob, last_login) values ($1, $2, $3, $4, $5)",
      [data.name, data.username, data.password, data.dob, data.last_login]
    );

    result = result.rowCount;

  } catch (err: any) {
    const error = err;
    console.error("(-) Error in querying with the db:\n", err.code, err.message);
    return {
      status: false,
      error: err
    };
  }

  return {
    status: true,
    rowCount: result,
  };
};

const updateUser = async (db_connection: any, id: number, data: any) => {
    let result;
    let keyValueList: any = [];
    let queryString = ""
    let count = 0;
    Object.keys(data).forEach((key) => {
      queryString = queryString.concat(`${key} = $${++count},`);
      keyValueList.push(data[key]);
    });

    if(!keyValueList.length) {
      return {
        status: false,
        errorMessage: "Invalid Request"
      }
    }

    keyValueList.push(id);
    try {
        result = await db_connection.query(
            `update users set ${queryString.slice(0,-1)} where id = $${keyValueList.length}`,
            keyValueList
        );
        result = result.rowCount;
        console.error(result);
    }catch(err){
        console.error("(-) Error in querying with the db", err);
        return {
            status: false,
            list: [],
        };
    }
    return {
        status: true,
        rowCount: result
    };
}

const deleteUser = async (db_connection: any, id: number) => {
    let result;
    try {
        result = await db_connection.query(
            "delete from users where id = $1",
            [id]
        );
        result = result.rowCount;
    }catch(err){
        console.error("(-) Error in querying with the db", err);
        return {
            status: false,
            list: [],
        };
    }
    return {
        status: true,
        rowCount: result,
    };
}

export { getAllusers, getUserById, getUserByUsername, setUser, updateUser, deleteUser};

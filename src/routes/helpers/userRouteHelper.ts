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

export { getAllusers, getUserById, getUserByUsername };

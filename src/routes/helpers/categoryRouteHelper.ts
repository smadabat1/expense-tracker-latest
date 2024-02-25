const getAllCategories = async (db_connection: any) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, description, createdon FROM category"
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

const getCategoryById = async (db_connection: any, id: number) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, description, createdon from category where id = $1",
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

const getCategoryByName = async (db_connection: any, name: string) => {
  let result;
  try {
    result = await db_connection.query(
      "SELECT id, name, description, createdon from category where name = $1",
      [name]
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

const setCategory = async (db_connection: any, data: any) => {
  let result;
  try {
    result = await db_connection.query(
      "insert into category(name, description, createdon) values ($1, $2, $3) returning id",
      [data.name, data.description, data.createdon]
    );

    result = result.rows[0].id;
  } catch (err: any) {
    const error = err;
    console.error(
      "(-) Error in querying with the db:\n",
      err.code,
      err.message
    );
    return {
      status: false,
      error: err,
    };
  }

  return {
    status: true,
    id: result,
  };
};

const updateCategory = async (db_connection: any, id: number, data: any) => {
  let result;
  let keyValueList: any = [];
  let queryString = "";
  let count = 0;
  Object.keys(data).forEach((key) => {
    queryString = queryString.concat(`${key} = $${++count},`);
    keyValueList.push(data[key]);
  });

  if (!keyValueList.length) {
    return {
      status: false,
      errorMessage: "Invalid Request",
    };
  }

  keyValueList.push(id);
  try {
    result = await db_connection.query(
      `update category set ${queryString.slice(0, -1)} where id = $${
        keyValueList.length
      }`,
      keyValueList
    );
    result = result.rowCount;
    console.error(result);
  } catch (err) {
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
};

const deleteCategory = async (db_connection: any, id: number) => {
  let result;
  try {
    result = await db_connection.query("delete from category where id = $1", [
      id,
    ]);
    result = result.rowCount;
  } catch (err) {
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
};

export {
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  setCategory,
  updateCategory,
  deleteCategory,
};

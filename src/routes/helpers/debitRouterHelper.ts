const getAllDebitTransactions = async (db_connection: any) => {
  let result;
  try {
    result = await db_connection.query("select * from debit");
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

const getDebitTransactionById = async (db_connection: any, id: number) => {
  let result;
  try {
    result = await db_connection.query("select * from debit where id = $1", [
      id,
    ]);
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

const getDebitTransactionByUserId = async (
  db_connection: any,
  userid: number
) => {
  let result;
  try {
    result = await db_connection.query(
      "select * from debit where user_id = $1",
      [userid]
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

const getDebitTransactionByCategoryId = async (
  db_connection: any,
  categoryid: number
) => {
  let result;
  try {
    result = await db_connection.query(
      "select * from debit where category_id = $1",
      [categoryid]
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

const getDebitTransactionByDate = async (db_connection: any, date: string) => {
  let result;
  try {
    result = await db_connection.query(
      "select * from debit where cast(debit_on as DATE) = $1",
      [date]
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

const setDebitTransaction = async (db_connection: any, data: any) => {
  let result;
  try {
    result = await db_connection.query(
      "insert into debit (debit_on, amount, name, description, user_id, category_id) values ($1, $2, $3, $4, $5, $6) returning id",
      [
        data.debit_on,
        data.amount,
        data.name,
        data.description,
        data.user_id,
        data.category_id,
      ]
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

const updateDebitTransaction = async (
  db_connection: any,
  id: number,
  data: any
) => {
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
      `update debit set ${queryString.slice(0, -1)} where id = $${
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

const deleteDebitTransaction = async (db_connection: any, id: number) => {
  let result;
  try {
    result = await db_connection.query("delete from debit where id = $1", [
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
  getAllDebitTransactions,
  getDebitTransactionById,
  getDebitTransactionByUserId,
  getDebitTransactionByCategoryId,
  getDebitTransactionByDate,
  setDebitTransaction,
  updateDebitTransaction,
  deleteDebitTransaction
};

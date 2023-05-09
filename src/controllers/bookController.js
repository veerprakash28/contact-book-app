// Adding a new Contact

module.exports.addContact = async (req, res, next) => {
  try {
    let db = req.con;
    let {
      first_name,
      middle_name,
      last_name,
      email,
      phone_number_1,
      phone_number_2,
      address,
    } = req.body;

    let query = `INSERT into contact_info (first_name, middle_name, last_name, email, phone_number_1, phone_number_2, address)
                    VALUES ('${first_name}','${middle_name}','${last_name}','${email}','${phone_number_1}','${phone_number_2}','${address}')`;

    let resp = db.query(query, function (err, results) {
      if (err) {
        res.send({
          message: "Oops! Something wrong happened while adding new contact",
          err,
        });
      } else {
        res.send({
          status: 1,
          message: "Successfully added a new Contact",
          data: results,
        });
      }
    });
  } catch (err) {
    res.send({
      message: "Oops! An Error Occured",
      err,
    });
  }
};

module.exports.editContact = async (req, res, next) => {
  try {
    let db = req.con;
    let {
      first_name,
      middle_name,
      last_name,
      email,
      phone_number_1,
      phone_number_2,
      address,
    } = req.body;
    let query = `UPDATE contact_info SET 
        first_name  = COALESCE(NULLIF(?, ''), first_name),
        middle_name  = COALESCE(NULLIF(?, ''), middle_name),
        last_name  = COALESCE(NULLIF(?, ''), last_name),
        phone_number_1  = COALESCE(NULLIF(?, ''), phone_number_1),
        phone_number_2  = COALESCE(NULLIF(?, ''), phone_number_2),
        address  = COALESCE(NULLIF(?, ''), address)
    WHERE email = ?`;
    let values = [
      first_name,
      middle_name,
      last_name,
      phone_number_1,
      phone_number_2,
      address,
      email,
    ];
    let resp = db.query(query, values, function (err, results) {
      if (err) {
        res.send({
          message: "Oops! Something wrong happened while updating a contact",
          err,
        });
      } else {
        res.send({
          status: 1,
          message: "Successfully Updated a Contact",
          data: results,
        });
      }
    });
  } catch (err) {
    res.send({
      message: "Oops! An Error Occured",
      err,
    });
  }
};

module.exports.viewAllContact = async (req, res, next) => {
  try {
    let db = req.con;
    let pageNo = req.query.pageNo ? parseInt(req.query.pageNo) : 1;
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let offset = (pageNo - 1) * limit;
    let orderBy = "first_name";
    let query = `SELECT * from contact_info WHERE is_deleted = 0 ORDER BY ${orderBy} LIMIT ${limit} OFFSET ${offset} `;
    let resp = db.query(query, (err, results) => {
      if (err) {
        res.send({
          message: "Oops! Something wrong happened while fetching all contacts",
          err,
        });
      } else {
        if (results.length > 0) {
          res.send({
            status: 1,
            message: "Successfully Fetched all Contacts",
            data: results,
          });
        } else {
          res.send({
            status: 1,
            message: "No Contacts Added",
            data: results,
          });
        }
      }
    });
  } catch (err) {
    res.send({
      message: "Oops! An Error Occured",
      err,
    });
  }
};

module.exports.deleteContact = async (req, res, next) => {
  try {
    let db = req.con;
    let email = req.body.email;

    let checkQuery = `SELECT * FROM contact_info WHERE email = '${email}' AND is_deleted = false`;
    let checkResp = await db.promise().query(checkQuery);

    if (checkResp[0].length == 0) {
      res.send({
        status: 0,
        message: "Contact does not exist or already deleted",
        data: [],
      });
      return;
    }

    let deleteQuery = `UPDATE contact_info SET is_deleted = true WHERE email = '${email}'`;
    let deleteResp = await db.promise().query(deleteQuery);

    res.send({
      status: 1,
      message: "Successfully deleted contact",
      data: [],
    });
  } catch (err) {
    res.send({
      message: "Oops! An Error Occured",
      err,
    });
  }
};

module.exports.searchContact = async (req, res, next) => {
  try {
    let db = req.con;
    let searchValue = req.query.searchValue;

    let query = `SELECT * FROM contact_info
        WHERE
            (first_name LIKE '%${searchValue}%' OR
            middle_name LIKE '%${searchValue}%' OR
            last_name LIKE '%${searchValue}%' OR
            email LIKE '%${searchValue}%' OR
            phone_number_1 LIKE '%${searchValue}%' OR
            phone_number_2 LIKE '%${searchValue}%' OR
            address LIKE '%${searchValue}%') AND is_deleted = 0 ORDER BY first_name`;

    let resp = db.query(query, (err, results) => {
      if (err) {
        res.send({
          message:
            "Oops! Something wrong happened while searching for contacts",
          err,
        });
      } else {
        if (results.length > 0) {
          res.send({
            status: 1,
            message: "Successfully Searched Contacts",
            data: results,
          });
        } else {
          res.send({
            status: 1,
            message: "No Contacts Found",
            data: results,
          });
        }
      }
    });
  } catch (err) {
    res.send({
      message: "Oops! An Error Occured",
      err,
    });
  }
};

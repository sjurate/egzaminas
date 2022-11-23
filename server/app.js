const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: "10mb" }));
const cors = require("cors");
app.use(cors());
const md5 = require("js-md5");
const uuid = require("uuid");
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});

//////////////////// LOGIN START /////////////////

const handleAuth = function (req, res, next) {
  if (req.url.indexOf("/server") === 0) {
    // admin
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length || results[0].role !== 10) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  } else if (
    req.url.indexOf("/login-check") === 0 ||
    req.url.indexOf("/login") === 0 ||
    req.url.indexOf("/register") === 0
  ) {
    next();
  } else {
    // front
    const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
    con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
      if (err) throw err;
      if (!results.length) {
        res.status(401).send({});
        req.connection.destroy();
      } else {
        next();
      }
    });
  }
};

app.use(handleAuth);

// AUTH
app.get("/login-check", (req, res) => {
  const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: "error", status: 1 }); // user not logged
    } else {
      if (req.query.role === "admin") {
        if (result[0].role !== 10) {
          res.send({ msg: "error", status: 2 }); // not an admin
        } else {
          res.send({ msg: "ok", status: 3 }); // is admin
        }
      } else {
        res.send({ msg: "ok", status: 4 }); // is user
      }
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: "error", key: "" });
    } else {
      res.send({ msg: "ok", key });
    }
  });
});

app.post("/register", (req, res) => {
  const key = uuid.v4();
  const sql = `
  INSERT INTO users (name, psw, session)
  VALUES (?, ?, ?)
`;
  con.query(sql, [req.body.name, md5(req.body.pass), key], (err, result) => {
    if (err) throw err;
    res.send({ msg: "ok", key, text: "Welcome!", type: "info" });
  });
});

/////////////////// LOGIN   END ////////////////////

// READ CURRENT USER

app.get("/home/users", (req, res) => {
  const sql = `
  SELECT *
  FROM users
  WHERE session = ?
`;
  con.query(sql, [req.headers["authorization"] || ""], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE CATEGORY

app.post("/home/categories", (req, res) => {
  const sql = `
    INSERT INTO categories (title)
    VALUES (?)
    `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ CATEGORIES

app.get("/home/categories", (req, res) => {
  const sql = `
    SELECT *
    FROM categories
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE CATEGORY

app.delete("/home/categories/:id", (req, res) => {
  const sql = `
  DELETE FROM categories WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE BOOK

app.post("/home/books", (req, res) => {
  const sql = `
    INSERT INTO books (author, name, image, category_id)
    VALUES (?, ?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.author, req.body.name, req.body.image, req.body.category_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// READ LIST OF BOOKS

app.get("/home/books", (req, res) => {
  const sql = `
  SELECT *
  FROM books
  ORDER BY id DESC
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE book

app.delete("/home/books/:id", (req, res) => {
  const sql = `
    DELETE FROM books
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE book

app.put("/home/books/:id", (req, res) => {
  let sql;
  let r;
  if (req.body.deletePhoto) {
    sql = `
        UPDATE books
        SET author = ?, name = ?, category_id = ?, image = null
        WHERE id = ?
        `;
    r = [req.body.author, req.body.name, req.body.category_id, req.params.id];
  } else if (req.body.image) {
    sql = `
        UPDATE books
        SET author = ?,  name = ?, category_id = ?, image = ?
        WHERE id = ?
        `;
    r = [
      req.body.author,
      req.body.name,
      req.body.category_id,
      req.body.image,
      req.params.id,
    ];
  } else {
    sql = `
        UPDATE books
        SET author = ?, name = ?, category_id = ?
        WHERE id = ?
        `;
    r = [req.body.author, req.body.name, req.body.category_id, req.params.id];
  }
  con.query(sql, r, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE BOOK - reserve

app.put("/home/books/:id", (req, res) => {
  const sql = `
  UPDATE books
  SET 
  status = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.status, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//**************************************************************************************************

// CREATE STORIE for user

app.post("/home/stories", (req, res) => {
  const sql = `
    INSERT INTO stories (title, info, amount_wanted, amount_left, image, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.info,
      req.body.amount_wanted,
      req.body.amount_left,
      req.body.image,
      req.body.user_id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// CREATE DONATION for user

app.post("/home/donations", (req, res) => {
  const sql = `
    INSERT INTO donations (name, amount_donating, storie_id)
    VALUES (?, ?, ?)
    `;
  con.query(
    sql,
    [req.body.name, req.body.amount_donating, req.body.storie_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

//  READ STORIES for CURRENT USER

app.get("/home/stories/:currentUserId", (req, res) => {
  const sql = `
  SELECT *
    FROM stories
    WHERE stories.user_id = ?
    
    `;
  con.query(sql, [req.params.currentUserId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ STORIES for admin

app.get("/home/stories-admin", (req, res) => {
  const sql = `
    SELECT *
    FROM stories
    ORDER BY id DESC
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ STORIES for home page

app.get("/home/stories-hp", (req, res) => {
  const sql = `
  SELECT s.*, d.id AS did, d.name, d.amount_donating
    FROM stories AS s
    LEFT JOIN donations AS d
    ON d.storie_id = s.id
    WHERE s.status = 1
    ORDER BY s.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE STORIE for user

app.put("/home/stories/:id", (req, res) => {
  let sql;
  let r;
  if (req.body.deletePhoto) {
    sql = `
        UPDATE stories
        SET title = ?, info = ?, amount_wanted = ?, image = null
        WHERE id = ?
        `;
    r = [req.body.title, req.body.info, req.body.amount_wanted, req.params.id];
  } else if (req.body.image) {
    sql = `
        UPDATE stories
        SET title = ?,  info = ?, amount_wanted = ?, image = ?
        WHERE id = ?
        `;
    r = [
      req.body.title,
      req.body.info,
      req.body.amount_wanted,
      req.body.image,
      req.params.id,
    ];
  } else {
    sql = `
        UPDATE stories
        SET title = ?, info = ?, amount_wanted = ?
        WHERE id = ?
        `;
    r = [req.body.type, req.body.color, req.body.price, req.params.id];
  }
  con.query(sql, r, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE STORIE for admin - APPROVE

app.put("/home/stories-admin/:id", (req, res) => {
  const sql = `
    UPDATE stories
    SET status = ?
    WHERE id = ?
    `;
  con.query(sql, [req.body.status, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// UPDATE STORIE - add donation

app.put("/home/stories-donation/:id", (req, res) => {
  const sql = `
    UPDATE stories
    SET 
    amount_collected = amount_collected + ?,
    amount_left = amount_wanted - amount_collected
    WHERE id = ?
    `;
  con.query(sql, [req.body.amount_donating, req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE STORIE for user

app.delete("/home/stories/:id", (req, res) => {
  const sql = `
    DELETE FROM stories
    WHERE id = ?
    `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//******************************************************************************************************* */

app.listen(port, () => {
  console.log(`Biblioteka per ${port} portą!`);
});

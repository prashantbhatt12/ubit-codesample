const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// API's
// GET POSTS
app.get("/getPost/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  try {
    const postList = await pool.query(`SELECT * from getPost(${page})`);

    res.send(postList.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// total records

app.get("/getTotalRecords", async (req, res) => {
  try {
    const response = await pool.query(`SELECT count(*) from "Posts"`);
    res.send(response.rows[0].count);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/getTotalUserRecords", async (req, res) => {
  const userId = parseInt(req.body.userId);
  try {
    const response = await pool.query(
      `SELECT count(*) from "Posts" where "ownerId"=${userId}`
    );
    res.send(response.rows[0].count);
  } catch (err) {
    console.log(err.message);
  }
});

// GET POSTS for a user

app.post("/getUserPost/:page", async (req, res) => {
  const page = parseInt(req.params.page);
  const userId = parseInt(req.body.userId);
  try {
    const postList = await pool.query(
      `SELECT * from getUserPost(${userId},${page})`
    );

    res.send(postList.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// DELETE Post
app.delete("/deletePost/:postId", async (req, res) => {
  const postId = parseInt(req.params.postId);
  try {
    const response = await pool.query(
      `DELETE from "Posts" where "Id"=${postId}`
    );

    res.send(response.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// UPDATE POST
app.put("/updatePost", async (req, res) => {
  let { postId, newPostIdType, newTitle, newBody, newImageUrl } = req.body;
  try {
    if (newImageUrl) {
      const response = await pool.query(
        `select * from updatePost(${parseInt(postId)},${parseInt(
          newPostIdType
        )},'${newTitle}','${newBody}','${newImageUrl}')`
      );
      res.send(response);
    } else {
      const response = await pool.query(
        `select * from updatePost(${parseInt(postId)},${parseInt(
          newPostIdType
        )},'${newTitle}','${newBody}',${newImageUrl})`
      );
      res.send(response);
    }
  } catch (err) {
    console.log(err.message);
  }
});

// ADD POST
app.post("/addPost", async (req, res) => {
  let { postTypeId, creationDate, ownerId, body, imageUrl, title } = req.body;
  try {
    if (imageUrl) {
      const response =
        await pool.query(`insert into "Posts" ("postTypeId", "creationDate", "deletionDate", "ownerId", "viewCount", "body", "imageUrl", "title", "commentCount", "likeCount") values (${parseInt(
          postTypeId
        )},'${creationDate}',null,${ownerId},1,'${body}','${imageUrl}','${title}',0,0);
            `);
      res.send(response);
    } else {
      const response =
        await pool.query(`insert into "Posts" ("postTypeId", "creationDate", "deletionDate", "ownerId", "viewCount", "body", "imageUrl", "title", "commentCount", "likeCount") values (${parseInt(
          postTypeId
        )},'${creationDate}',null,${ownerId},1,${body},${imageUrl},${title},0,0);
            `);
      res.send(response);
    }
  } catch (err) {
    console.log(err.message);
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on PORT ${port}...`));

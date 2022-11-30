import { Fragment, useRef } from "react";
import classes from "./CreatePostForm.module.css";
const CreatePostForm = () => {
  const postTitle = useRef();
  const postDesc = useRef();
  const postType = useRef();
  const onCreatePostClickHandler = async (event) => {
    event.preventDefault();
    //let { postTypeId, creationDate, ownerId, body, imageUrl, title } = req.body;
    let curDate = new Date();
    curDate = curDate.toISOString().split("T")[0];
    console.log(curDate.toString());
    const postData = {
      postTypeId: postType.current.value,
      creationDate: curDate.toString(),
      ownerId: 265,
      body: postDesc.current.value,
      imageUrl: "https://unesco.org/felis/sed/lacus.jpg",
      title: postTitle.current.value,
    };
    //console.log(postData);
    const response = await fetch("http://localhost:3001/addPost", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response from the post", response);
    if (response.ok) {
      window.alert("Record added");
    }
    postTitle.current.value = "";
    postDesc.current.value = "";
    postType.current.value = "1";
  };
  return (
    <Fragment>
      <form className={classes.form}>
        <h2>Create Post</h2>
        <div className={classes.control}>
          <label htmlFor="post-title">Post Title</label>
          <input type="text" id="post-title" ref={postTitle} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="post-desc">Post Description</label>
          <textarea rows="4" cols="50" id="post-desc" required ref={postDesc} />
        </div>
        <div className={classes.control}>
          <label htmlFor="post-type">Post Type</label>
          <select id="post-type" required ref={postType}>
            <option value={2}>Alerts</option>
            <option value={1}>Events</option>
            <option value={3}>Promotions</option>
            <option value={4}>Posts</option>
          </select>
        </div>
        <div className={classes.action}>
          <button onClick={onCreatePostClickHandler}>Create Post</button>
        </div>
      </form>
    </Fragment>
  );
};
export default CreatePostForm;

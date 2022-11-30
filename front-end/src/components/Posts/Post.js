import classes from "./Post.module.css";
import { useState } from "react";
import { useRef } from "react";
const Post = (props) => {
  const postTypeMap = new Map();
  postTypeMap.set("1", "Events");
  postTypeMap.set("2", "Alerts");
  postTypeMap.set("3", "Pomotions");
  postTypeMap.set("4", "Posts");
  const { userId } = props;
  const { postId, title, body, imageUrl, postTypeId, creationDate } =
    props.data;
  const [editPost, setEditPost] = useState(false);
  const enteredTitle = useRef();
  const enteredDesc = useRef();
  const [postDate, ,] = creationDate.split("T");
  const editPostClickHandler = () => {
    //console.log("hereadadadd");
    setEditPost((prevState) => !prevState);
  };
  const updatePostClickHandler = async () => {
    //{postId,newPostIdType,newTitle,newBody,newImageUrl}=req.body
    const updatedJson = {
      postId: postId,
      newPostIdType: postTypeId,
      newTitle: enteredTitle.current.value,
      newBody: enteredDesc.current.value,
      newImageUrl: imageUrl,
    };
    console.log("updated data:", updatedJson);
    const response = await fetch("http://localhost:3001/updatePost", {
      method: "PUT",
      body: JSON.stringify(updatedJson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("record updated");
      window.location.reload(false);
    }
  };
  const onDeletePostClickHandler = async () => {
    const response = await fetch(`http://localhost:3001/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      alert("record deleted");
      window.location.reload(false);
    }
  };
  return (
    <div className={classes.post}>
      {!editPost && (
        <>
          <small>{postId}</small>
          <h1>{`${title} : ` + postTypeMap.get(postTypeId.toString())}</h1>
          <p>{body}</p>
          Creation Date:{postDate}
        </>
      )}
      {editPost && (
        <form className={classes.form}>
          <div className={classes.control}>
            <label htmlFor="edit-post-title">Post title</label>
            <input
              type="text"
              defaultValue={title}
              id="edit-post-title"
              ref={enteredTitle}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="edit-post-desc">Post Desc</label>
            <textarea
              type="text"
              id="edit-post-desc"
              defaultValue={body}
              rows="4"
              cols="52"
              ref={enteredDesc}
            ></textarea>
          </div>
        </form>
      )}
      {!editPost && userId !== -1 && (
        <>
          <form className={classes.form}>
            <div className={classes.action}>
              <button onClick={editPostClickHandler} type="button">
                <span className="bi bi-pencil-square"></span>&nbsp;Edit Post
              </button>
              &nbsp;&nbsp;
              <button onClick={onDeletePostClickHandler} type="button">
                <span className="bi bi-trash"></span>&nbsp;Delete Post
              </button>
            </div>
          </form>
        </>
      )}
      {editPost && userId !== -1 && (
        <>
          <form className={classes.form}>
            <div className={classes.action}>
              <button onClick={editPostClickHandler} type="button">
                <span className="bi bi-x-square"></span>&nbsp;Cancel Edit
              </button>
              &nbsp;&nbsp;
              <button onClick={updatePostClickHandler} type="button">
                <span className="bi bi-save"></span>&nbsp;Save Edit
              </button>
            </div>
          </form>
        </>
      )}
      &nbsp;&nbsp;
    </div>
  );
};

export default Post;

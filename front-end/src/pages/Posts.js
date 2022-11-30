import { useEffect, useState, useCallback } from "react";
import Pagination from "../components/Pagination/Pagination";
import Post from "../components/Posts/Post";
const Posts = ({ userId }) => {
  // const url = "https://jsonplaceholder.typicode.com/posts";
  const pageCount = 10;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPage] = useState(0);
  // const [allPosts,setAllPosts]=useState([])

  const onChangePageClickedHandler = (pageNumber) => {
    const newPageNumber = Number(pageNumber);
    setCurrentPage(newPageNumber);
  };
  const onNextPageClickedHandler = () => {
    setCurrentPage((page) => page + 1);
  };
  const onNextPrevClickedHandler = () => {
    setCurrentPage((page) => page - 1);
  };

  const fetchData = useCallback(async () => {
    console.log("userId is", userId);
    try {
      setError(null);
      //const response = await fetch(url);

      if (userId === -1) {
        const count = await fetch("http://localhost:3001/getTotalRecords");
        const countVal = await count.json();
        setPage(Math.round(countVal / pageCount));
        const response = await fetch(
          `http://localhost:3001/getPost/${currentPage}`
        );
        if (!response.ok) {
          throw Error("Something went wrong");
        }
        const data = await response.json();
        console.log("post data:", data);
        setPosts(data);
      } else {
        const count = await fetch("http://localhost:3001/getTotalUserRecords", {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const countVal = await count.json();
        console.log("user specific data", countVal);
        setPage(Math.ceil(countVal / pageCount));
        const response = await fetch(
          `http://localhost:3001/getUserPost/${currentPage}`,
          {
            method: "POST",
            body: JSON.stringify({
              userId: userId,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw Error("Something went wrong");
        }
        const data = await response.json();
        console.log("post data:", data);
        setPosts(data);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [userId, currentPage]);

  useEffect(() => {
    fetchData();
  }, [userId, fetchData]);
  if (error) return <div>{error}</div>;
  return (
    <div>
      {posts.length > 0 ? (
        <Pagination
          data={posts}
          RenderComponent={Post}
          title={`${userId === -1 ? "All" : "My "} Posts`}
          pageLimit={userId !== -1 ? 2 : 5}
          dataLimit={10}
          currentPage={currentPage}
          pages={pages}
          onPageChange={onChangePageClickedHandler}
          onNextChange={onNextPageClickedHandler}
          onPrevChange={onNextPrevClickedHandler}
          userId={userId}
        ></Pagination>
      ) : (
        <h1>No posts to display sorry</h1>
      )}
    </div>
  );
};
export default Posts;

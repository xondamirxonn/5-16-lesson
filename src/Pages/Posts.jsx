import { Button, Container, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../Store/Slices/post";

const Posts = () => {
  const { data, isLoading } = useFetch("/posts");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPosts(data));
  }, [data, dispatch]);

  const posts = useSelector((store) => store.post.posts);

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!text) return toast("Text is required", { type: "error" });

    setLoading(true);
    try {
      const { data } = await axios.post("/posts", { text });
      dispatch(setPosts([data, ...posts]));
    } catch (error) {
      console.log(error);
      const errors = error?.response?.data?.errors;
      if (errors?.length > 0) {
        errors.forEach((err) => {
          toast(err.msg, { type: "error" });
        });
      }
    } finally {
      setLoading(false);
      setText("");
    }
  }
  console.log(data);
  return (
    <section>
      <Container>
        <h1 className="text-info display-4 fw-bold">Sign In</h1>
        <p className="fs-4">
          <FaUser /> Welcome to the community
        </p>
        <p className="bg-info text-light py-2 px-4">Say Something...</p>
        <Form className="d-grid gap-3 my-3" onSubmit={handleCreatePost}>
          <Form.Control
            value={text}
            onChange={(e) => setText(e.target.value)}
            as="textarea"
            placeholder="Create a Post"
          />
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? <Spinner /> : "Submit"}
          </Button>
        </Form>
        {isLoading ? (
          <Spinner />
        ) : (
          posts && (
            <div>
              <ul>
                {posts.map((post) => {
                  return (
                    <li
                      key={post._id}
                      className="border rounded-3 my-3 p-4 list-unstyled d-flex"
                    >
                      <div className="d-grid ">
                        <img
                          width={125}
                          height={125}
                          className="rounded-circle"
                          src={post.avatar}
                          alt={`${post.name}'s avatars`}
                        />
                        <small className="text-center my-2">{post.name}</small>
                      </div>
                      <div className="flex-fill align-items-center d-grid mx-5">
                        {post.text}
                        <small className="text-secondary">{`Posted on ${new Date(
                          post.date
                        ).toLocaleDateString()}`}</small>
                        <div className="d-flex gap-3 align-items-center">
                          <Button variant="success" className="d-flex align-items-center gap-1">
                            {" "}
                            <FaThumbsUp /> {post.likes.length}
                          </Button>{" "}
                          <Button variant="danger"><FaThumbsDown /></Button>
                          <Button
                            as={Link}
                            variant="info"
                            to={`/posts/${post._id}`}
                          >
                            {" "}
                            Discussion
                          </Button>
                        </div>
                        {/* </Link> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </Container>
    </section>
  );
};

export default Posts;

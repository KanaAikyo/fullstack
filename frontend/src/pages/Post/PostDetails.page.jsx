import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import styles from "./PostDetails.module.css"
import useBoundStore from "../../store/Store";
import { useLoaderData } from "react-router-dom";

export function PostDetailsPage() {
  const { user } = useBoundStore((state) => state)
  const author =user.email.substring(0,user.email.indexOf("@"))
  const posts = useLoaderData();
  const id = window.location.pathname.slice(-1)-1

  const isUserAuther =user.id === posts[id].userId 
// console.log()

  return (
    <>
      <Container>
    <div className={styles.parent}>
      <div className={styles.details}>
        <p className={styles.labels}>Author</p>
        <p className={styles.contents}>{author}</p>
        <p className={styles.labels}>Title</p>
        <p className={styles.contents}>{posts[id].title}</p>
        <p className={styles.labels}>Category</p>
        <p className={styles.contents}>{posts[id].category}</p>
        <p className={styles.labels}>Content</p>
        <p className={styles.contentsLast}>{posts[id].content}</p>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>

        {isUserAuther &&
        (<Button style={{marginLeft:"5px"}}>
          <Link to={`/posts/${id+1}/edit`}>Edit</Link>
        </Button>)}

      </div>
      <div className={styles.image}>
        <img src={posts[id].image} alt="image" />
      </div>
    </div>
    
        
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  // do something with this
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("I ran!");
  return res.data;
};


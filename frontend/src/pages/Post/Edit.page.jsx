import { Link } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container } from "@mantine/core";
import styles from "./PostDetails.module.css"
import useBoundStore from "../../store/Store";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

//did not finish the backend part
export function Edit(){
    const { user } = useBoundStore((state) => state)
    const post = useLoaderData();
    const [title, setTitle]=useState(post.title)
    const [category, setCategory] = useState(post.category);
    const [content, setContent] = useState(post.content);
    const [image, setImage] = useState(post.image);

    const modifyPost = (e) => {
      e.preventDefault();
      axios.post(`${DOMAIN}/api/posts/${post.id}/Edit`, {
          title: title,
          category: category,
          content: content,
          image: image,
        })
        .then((response) => {
          console.log("Post updated successfully");
        })
        .catch((err) => console.log(err));
    }
    
    return(
       <Container>
        <form action="">
       <div className={styles.parent}>
            <div className={styles.details}>
               
                <label htmlFor = "title" className={styles.labels}>Title</label><br/>
                <input  id= "title" type="text"name="title"  
                        className={styles.contents} 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor = "category" className={styles.labels}>Category</label>
                <input  id= "category" type="text" name="category" 
                        className={styles.contents} 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}/>
                <label htmlFor = "content" className={styles.labels}>Content</label>
                <textarea id= "content" type="textarea" name="content" 
                        className={styles.contentsLast} 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                <label htmlFor = "image" className={styles.labels}>imageUrl</label>
                <textarea id= "image" type="textarea" name="content" 
                className={styles.contentsLast} 
                value={image}
                onChange={(e) => setImage(e.target.value)}/>


                <Button>
                  <Link to={`/posts/${post.id}`}>Back to Posts</Link>
          
                </Button>
                <Button type="submit" style={{marginLeft:"5px"}} onClick={modifyPost }>
                  <Link  to={`/posts/${post.id}`}>Save</Link>
                </Button>
               
            </div>
            <div className={styles.image}>
            </div>
        </div>
        </form>
        </Container>
        
    )
}

export const postDetailsLoader2 = async ({params}) => {
  const id = params.id-1
  const res = await axios.get(`${DOMAIN}/api/posts/${id}/edit`)
  return res.data;
  };
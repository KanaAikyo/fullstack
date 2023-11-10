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
    const author =user.email.substring(0,user.email.indexOf("@"))
    const posts = useLoaderData();
    const id = window.location.pathname.substr(7,1)-1
    const [title, setTitle]=useState(posts[id].title)
    const [category, setCategory] = useState(posts[id].category);
    const [content, setContent] = useState(posts[id].content);
    const [image, setImage] = useState(posts[id].image);

    const modifyPost = (e) => {
      e.preventDefault(); // Corrected preventDefault spelling
      axios
        .patch(`${DOMAIN}/api/posts/${id+1}`, {
          // .patch(`${DOMAIN}/api/posts`, {
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
                  <Link to={`/posts/${id+1}`}>Back to Posts</Link>
                </Button>
                <Button type="submit" style={{marginLeft:"5px"}} onClick={modifyPost }>
                  <Link  to={`/posts/${id+1}`}>Edit</Link>
                </Button>
               
            </div>
            <div className={styles.image}>
            </div>
        </div>
        </form>
        </Container>
        
    )
}

export const postDetailsLoader2 = async () => {
    const res = await axios.get(`${DOMAIN}/api/posts`);
    return res.data;
  };
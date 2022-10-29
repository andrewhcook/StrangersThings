import { useEffect, useState } from "react";
import { CreatePost } from "../api/Requests";

const CreatePostForm = (props) => {
    const {token, setPosts, posts, reloadItem, setReloadItem} = props
    const [postSubmission, setPostSubmission] = useState({});
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState("false");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const[title, setTitle] = useState("");
    useEffect(()=> {
        console.log("title", title);
        setPostSubmission({title: title, location:location,willDeliver:willDeliver, price: price, description:description}); 
    },[location, willDeliver,price,description,title])
    const onSubmitHandler = async (event) => {
       // event.preventDefault();
       event.preventDefault();
       console.log("onSubmitHandler() called in CreatePostForm");
       
       console.log("postSubmission in onSubmitHandler() in CreatePostForm before CreatePost() call", postSubmission);
       const {error, post, message} = await CreatePost(token,postSubmission);
       console.log("new post", post);
       setReloadItem(!reloadItem);
      /*  const new_posts_value = posts.push(post);
       setPosts(new_posts_value);   */
    }


    return (<form className="create-post-form" onSubmit={ async (event) => {
       
        onSubmitHandler(event);
        }}>
        <h1>Create Post Form</h1>

        <div className="field">
            <label>Title</label>
            <input
            type = "text"
            label = "Title"
            placeholder="Title"
            value = {title}
            required
            onChange = { (event) => {
                setTitle(event.target.value);}}
            />
            
        </div>
        
        <div className="field">
            <label>Location</label>
            <input
            type = "text"
            label = "Location"
            value = {location}
            placeholder="Location"
            required
            onChange = {(event) => {setLocation(event.target.value)}}
            />
            
        </div>
        <div className="field">
            <label>Will Deliver</label>
            <input
            type = "checkbox"
            label = "Will Deliver"
            onChange = {() => {setWillDeliver(true)}}
            /> 
            <input
            type = "checkbox"
            label = "Can't or Won't Deliver"
            onChange = {() => {setWillDeliver(false)}}
            /> 
            
        </div>
        <div className="field">
            <label>Price</label>
            <input
            type = "text"
            value = {price}
            placeholder = "Price"
            required
            onChange = {(event) => {setPrice(event.target.value)}}
            />
            
        </div>
        <div className="field">
            <label>Description</label>
            <input
            type = "text"
            value = {description}
            placeholder = "Description"
            required
            onChange = {(event) => {setDescription(event.target.value)}}
            />
            
        </div>
        <button className="submit-form" type = "submit" value = "Submit">Submit</button>
    </form>);

}

export default CreatePostForm
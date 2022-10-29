


const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";




const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  console.log(headers);
  return headers;
};

export const apiCall = async (endpoint, defaultOptions= {}) => {
  const {token, method, body} = defaultOptions;
  
  const options = {};
  options.headers = makeHeaders(token);
  if (method) {
    options.method = method;
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  console.log("body in apiCall", options.body);
    console.log("options in apiCall", options);
    const response = await fetch(`${BASEURL}/${endpoint}`, options);
    const result = await response.json();
    return result;
}

export const fetchPosts = async (token = null)=> {
  const {success, error, data} = await apiCall('posts', {token:token, method:"GET"});
  console.log("data: ", data.posts);
  if (success) {
    console.log("success! in fetchPosts()");
    return {
      error: null,
      posts_value: data.posts
    }
  } else {
    console.log("failure :( in fetchPosts()")
    return {
      error: "Failed to Load apiCall in fetchPosts",
      posts_value: []
    }
  }
}

export const registerUser = async (username, password) => {
  try {
    const {success, error, data} = await apiCall('users/register', {token: null, method: "Post", body: {user: {username: username,
    password: password}}} );
    if (success) {
      console.log(username, data.token)
      return {
        error: null,
        token: data.token,
        mesage: data.message
      }
    } else {
      console.log("no success in registerUser()", error);
      return {
        error: error.message,
        token: null,
        message: null
      }
    }
  } catch (error){
    console.error(error);
    return {
      error: "error in registeredUser() call",
      token: null,
      message: null
    }
  }
}

export const logInUser = async (username, password) => {
  try {
    const {success, error, data} = await apiCall('users/login', {token: null, method: "Post", body: {user: {username: username,
    password: password}}} );
    if (success) {
      console.log(username, data.token)
      return {
        error: null,
        token: data.token,
        mesage: data.message
      }
    } else {
      alert("Incorrect User Credentials");
      console.log("no success in registerUser()", error);
      return {
        error: error.message,
        token: null,
        message: null
      }
    }
  } catch (error){
    console.error(error);
    return {
      error: "error in registeredUser() call",
      token: null,
      message: null
    }
  }
}

export const isLoggedIn = (token = null) => {
  if (token) {return true} else {
    return false
  }
}

export const CreatePost = async (token, post) => {
  try {
    const {success, error, data} = await apiCall('posts', {token: token, method: "Post", body: {post: post}} );
    if (success) {
      return {
        error: null,
        post: data.post,
        mesage: data.message
      }
    } else {
      console.log("error in CreatePost", error.message);
      return {
        error: error.message,
        post: null,
        message: null
      }
    }
  } catch (error){
    console.error(error);
    return {
      error: "error in CreatePost() call",
      post: null,
      message: null
    }
  }
}

export const fetchUser = async (token) => {
  try {
    console.log("fetchUser() called");
    const {success, error, data} = await apiCall('users/me', {token:token});
    console.log("fetchUser() data", data);
    if (success) {
      return {
        error: null,
        userResponse: data,
        mesage: data.message
      }
    } else {
      return {
        error: error.message,
        userResponse: null,
        message: null
      }
    }
  } catch (error){
    console.error(error);
    return {
      error: "error in FetchUser() call",
      userResponse: null,
      message: null
    }
  }
}

export const DeletePost = async (token, POST_ID) => {
  console.log("DeletePost() called");
  await apiCall(`posts/${POST_ID}`, {token:token, method: "DELETE"});
   
}

export const SendMessage = async (token, POST_ID, content) => {
  console.log("SendMessage() called");
  console.log(content);
  const {success, error, data} = await apiCall(`posts/${POST_ID}/messages`, {token: token, method: "POST", body: {message:{ content: content}}})
  if (error) {
    console.log(error);
  }
}



const BASEURL = "https://strangers-things.herokuapp.com/api/2207-FTB-ET-WEB-PT";




const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

export const apiCall = async (endpoint, defaultOptions= {}) => {
  const {token, method, body} = defaultOptions;
  const options = makeHeaders(token);
  if (method) {
    options.method = method;
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
    
    const response = await fetch(`${BASEURL}/${endpoint}`, options);
    const result = await response.json();
    
    return result;
}

export const fetchPosts = async ()=> {
  const {success, error, data} = await apiCall('posts');
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


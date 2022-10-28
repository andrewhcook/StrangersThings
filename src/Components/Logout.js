 const logOutUser = ({setToken}) => {
  return <div><button onClick={()=> {
    window.localStorage.removeItem("token");
    setToken(null);
}}>Logout</button></div>
}

export default logOutUser
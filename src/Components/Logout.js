 const logOutUser = ({setToken}) => {
  return <div><button onSubmit={setToken("")}>Logout</button></div>
}

export default logOutUser
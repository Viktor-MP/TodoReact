import { useRef, useState } from "react";
import { Users } from "./Utiles/Utiles";
import "./App.css";

const App =() => {
  console.log(Users)
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")) || Users);

  const [searchName, setSearchName] = useState("");

  const [nextUserId, setNextUserId] = useState(users.length+1)


  const userNameRef = useRef("");
  const userSurNameRef = useRef("");


  const addUserHendler = () => {
    setNextUserId(nextUserId+1)
    setUsers(
      users.concat({
        name: userNameRef.current.value,
        surname: userSurNameRef.current.value,
        id: nextUserId,
      })
    );
  };

  const deleteUserHendler = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  
  const changeNameHandler = (event) => {
    setSearchName(event.target.value);
  };

  const deleteAllUsers = () => {
    const filtered = users.filter((el) => !el.isChecked);
    setUsers(filtered);
  };

  const filterByName = (item) => {
    return item.name
      .toLocaleLowerCase()
      .includes(searchName.toLocaleLowerCase());
  };


  return (
    <div className="App">
      <div className="heading">
        <div className="addInputs">
        <input ref={userNameRef} placeholder="name" />
        <input ref={userSurNameRef} placeholder="surname" />
        <button onClick={addUserHendler}>Add User</button>
      </div>
      <div className="searchUser">
        <input onChange={changeNameHandler} placeholder="serch users" />
      </div>
      </div>
      <div className="body">
        <ul type="none" className="list">
          {localStorage.setItem('users', JSON.stringify(users))}
          {users.filter(filterByName).map((user) => {
            return (
              <li id={user.id} className="listItem" key={user.id}>
                <input
                  onChange={() => (user.isChecked = !user.isChecked)}
                  type="checkbox"
                />
                <p>{user.name}</p>
                <p className="textOverflow">{user.surname}</p>
                <button   onClick={() => deleteUserHendler(user.id)}>X</button>
              </li>
            );
          })}
      <button className="deleteAllUsers" onClick={deleteAllUsers}> Delete all cheked users </button>
        </ul>
      </div>
    </div>
  );
}

export default App;

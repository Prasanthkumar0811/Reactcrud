import { useEffect, useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import UserTable from './components/UserTable'

function App() {

  // 1. LOAD: read saved users when the app starts
  const [users,setUsers]=useState(()=>{
    const saved=localStorage.getItem('users')
    return saved ? JSON.parse(saved) : []
  })
  const [editUser,setEditUser]=useState(null);

  // 2. SAVE: write users to localStorage every time they change
  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(users))
  },[users])

  function handleSave(form){
    if(editUser){
      setUsers(users.map((u)=>(u.id === editUser.id ? {...form,id:editUser.id} : u)))
      setEditUser(null)
    }else{
      const newId=users.length > 0 ? Math.max(...users.map((u)=>u.id)) + 1 :1
      setUsers([...users,{...form,id:newId}]);
    }
  }

  function handleDelete(id){
    if(window.confirm(`Are you sure you want to delete the id ${id}`)){
      setUsers(users.filter((u)=>u.id != id))
    }
  }
  return (
    <div className='container'>
      <h1>Users CRUD APP</h1>
        <UserForm onSave={handleSave} editUser={editUser} onCancel={()=>setEditUser(null)}></UserForm>
        <UserTable users={users} onEdit={setEditUser} onDelete={handleDelete}></UserTable>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import {Card} from '../../components/Card'
import './style.css'

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' });

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    };

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    //corpo do useEffect -> Ações que eu quero que sejam executadas
    fetch('https://api.github.com/users/nilloferreiira')
    .then(response => response.json())
    .then(data => {    
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, []);

  return (
    <div className='container'>
    <header>
    <h1>Lista de presença</h1>
    <strong>{user.name}</strong>
    <img src={ user.avatar } alt="Foto de perfil" />
    </header>
    <input type="text" placeholder='Digite seu nome...'
      onChange={event => setStudentName(event.target.value)}
    />
    <button type='button' onClick={handleAddStudent}>
      Adicionar
      </button>

    { students.map(student => <Card key={student.time} name={student.name} time={student.time}/>)  }

    </div>
  )
}

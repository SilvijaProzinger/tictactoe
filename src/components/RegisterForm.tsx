import { useState, useEffect } from 'react';
import { User } from '../types/types';
import { useAuth } from '../context/AuthContext';
import stylesButton from '../styles/Buttons.module.css'
import stylesForm from '../styles/Form.module.css'

function RegisterForm() {
  const [formData, setFormData] = useState<User>({
    username: '',
    password: ''
  })
  const { user, register, error } = useAuth()

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register(formData)
  }

  useEffect(() => {
    console.log(formData)
  },[formData])

  //to add input error handler

  return (
    <div>
      <p className={stylesForm.form__title}>Register</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="Enter your username" id="username" onChange={handleInput}/>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={handleInput}
        />
        {error && (
          <div>{error}</div>
        )}
        <button type="submit" className={stylesButton.primary} disabled={!formData.username || !formData.password}>Register</button>
      </form>
    </div>
  );
}

export default RegisterForm;

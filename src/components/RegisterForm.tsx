import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from '../contexts/UserContext'
import { useEffect, useState } from 'react'
import axios from '@/api/axios'
import type { Register } from 'react-router'

type RegisterCredentials = {
  userName: User['userName'],
  email: User['email'],
  password: User['password']
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ defaultValues: { userName: "", email: "", password: "" } }) //the input-fields

  const { user, actions } = useUser()
  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitted) {
      reset({ userName: "", email: "", password: "" })
    }
    setIsSubmitted(false)
    setFormError("")
  }, [isSubmitted, reset])

  // const onSubmit: SubmitHandler<User> = async (data: User) => {
    const onSubmit: SubmitHandler<RegisterCredentials> = async (userData: RegisterCredentials) => {
    console.log(userData)
    const _user= { userName: userData.userName, email: userData.email.trim(), password: userData.password.trim()}
    // const existingUser = user?.id === _user._id ? user : undefined


        
    // if (!existingUser) {
    //   actions.createUser(_user)
    //   actions.setUser(_user)
      actions.createUser(_user)
      setIsSubmitted(true)
      setLoading(false)
    // } else {
    //   setFormError("Username already taken")
    //   return
    // }

    return
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block mb-2" >First and last name: </label>
          <input className='border' id='userName' {...register("userName", { required: true })} />
          {errors.userName && errors.userName.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a username</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2" >Email: </label>
          <input type="email" className='border' id='email' {...register("email", { required: true })} />
          {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a valid email</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-2">Password: </label>
          <input type='password' className='border' id='password' {...register("password", { required: true })} />
          {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a password</p>}
        </div>

        <div>
          {formError && <p className="text-red-500 text-sm italic mb-3">{formError}</p>}
        </div>

        <div>
          <input
            type="submit"
            value="Create account"
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </form>
    </div>
  )
}

export default RegisterForm

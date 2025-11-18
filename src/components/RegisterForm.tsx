import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from '../contexts/UserContext'
import { useEffect, useState } from 'react'

type RegisterFormProps = {
  onSuccess: () => void
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ defaultValues: { uid: Math.floor((Math.random() * 10000) + 1), userName: "", email: "", password: "" } })

  const { users, actions } = useUser()

  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitted == true) {
      reset({ userName: "", email: "", password: "", uid: 0 })
      onSuccess()
    }
    setIsSubmitted(false)
    setFormError("")
  }, [isSubmitted, reset])

  const onSubmit: SubmitHandler<User> = (data: User) => {
    const _user: User = { uid: data.uid, userName: data.userName.trim(), email: data.email.trim(), password: data.password.trim()}
    const existingUser = users.find((u) => u.uid == _user.uid)

    if (!existingUser) {
      actions.createUser(_user)
      actions.setUser(_user)
      setIsSubmitted(true)
    } else {
      setFormError("Username already taken")
      return
    }

    return
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block mb-2" >First and last name: </label>
          <input className='border' {...register("userName", { required: true })} />
          {errors.userName && errors.userName.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a username</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2" >Email: </label>
          <input className='border' {...register("email", { required: true })} />
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

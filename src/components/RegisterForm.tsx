import { useForm, type SubmitHandler } from 'react-hook-form'
import { useUser } from '../contexts/UserContext'
import { useEffect, useState } from 'react'

type RegisterCredentials = {
  userName: User['userName'],
  email: User['email'],
  password: User['password']
}

type RegisterFormProps = {
  onSuccess: () => void
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
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

    const onSubmit: SubmitHandler<RegisterCredentials> = async (userData: RegisterCredentials) => {
    console.log(userData)
    const _user= { userName: userData.userName, email: userData.email.trim(), password: userData.password.trim()}

      actions.createUser(_user)
      setIsSubmitted(true)
      setLoading(false)
      onSuccess()
    return
  }

  return (
    <div className="w-full flex items-center justify-center">
      <form className="bg-white mx-7 pt-6 mb-4 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
      <h5>Sign up to Noble Stay</h5>
        <div className="m-4">
          <label className="body-small block mb-2" >First and last name: </label>
          <input className='border' id='userName' {...register("userName", { required: true })} />
          {errors.userName && errors.userName.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a username</p>}
        </div>

        <div className="mb-4">
          <label className="body-small block mb-2" >Email: </label>
          <input type="email" className='border' id='email' {...register("email", { required: true })} />
          {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a valid email</p>}
        </div>

        <div className="mb-6">
          <label className="body-small block mb-2">Password: </label>
          <input type='password' className='border' id='password' {...register("password", { required: true })} />
          {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a password</p>}
        </div>

        <div>
          {formError && <p className="text-red-500 text-sm italic mb-3">{formError}</p>}
        </div>

        <div>
          <input
            type="submit"
            value="SIGN UP"
            className='primary-btn'
          />
        </div>
      </form>
    </div>
  )
}

export default RegisterForm

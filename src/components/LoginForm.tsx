import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

type LoginCredentials = {
  email: User['email'],
  password: User['password']
}

type LoginFormProps = {
  onSuccess: () => void
}

function LoginForm({ onSuccess }: LoginFormProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({ defaultValues: { email: "", password: ""} })

  const { user, actions } = useUser()

  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", password: "" })
    }
    setIsSubmitted(false)
    setFormError("")

  }, [isSubmitted, reset])

  // const onSubmit: SubmitHandler<User> = (data: User) => {
  const onSubmit: SubmitHandler<LoginCredentials> = async (userData: LoginCredentials) => {  
        console.log(userData.email)
    const _user= {  email: userData.email.trim(), password: userData.password.trim()}
  // const existingUser = _user.find((u: User) => u.email == userData.email)
//FIX
    // if (!existingUser) {
    //   setFormError("Could not find account")
    // } else {
      // if (existingUser.password == userData.password) {
        actions.loginUser(_user)
        setIsSubmitted(true)
        setLoading(false)
        onSuccess()
      // } else {
      //   setFormError("Wrong password")
      //   return
      // }
        return
    }

  return (
    <div className="w-full flex items-center justify-center">
      <form className="bg-white mx-10 pt-6 mb-4 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
        <h5>Welcome back</h5>
        <div className="my-4">
          <label className="body-small block mb-2" >Email: </label>
          <input className='border' id="email" {...register("email", { required: true })} />
          {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a valid email</p>}
        </div>

        <div className="mb-6">
          <label className="body-small block mb-2">Password: </label>
          <input type='password' className='border' id='password' {...register("password", { required: true })} />
          {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide the password</p>}
        </div>

        <div>
          {formError && <p className="text-red-500 text-sm italic mb-3">{formError}</p>}
        </div>

        <div>
          <input
            type="submit"
            value="LOG IN"
            className='primary-btn'
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm

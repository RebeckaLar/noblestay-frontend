import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'

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

  const { users, actions } = useUser()

  const [formError, setFormError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (isSubmitted) {
      reset({ email: "", password: "" })
    }
    setIsSubmitted(false)
    setFormError("")

  }, [isSubmitted, reset])

  const onSubmit: SubmitHandler<User> = (data: User) => {
    const existingUser = users.find((u) => u.email == data.email)

    if (!existingUser) {
      setFormError("Could not find account")
    } else {
      if (existingUser.password == data.password) {
        actions.setUser(existingUser)
        setIsSubmitted(true)
        onSuccess()
      } else {
        setFormError("Wrong password")
        return
      }
    }

    return
  }

  return (
    <div className="w-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-4">
          <label className="block mb-2" >Email: </label>
          <input className='border' {...register("email", { required: true })} />
          {errors.email && errors.email.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide a valid email</p>}
        </div>

        <div className="mb-6">
          <label className="block mb-2">password: </label>
          <input type='password' className='border' id='password' {...register("password", { required: true })} />
          {errors.password && errors.password.type === "required" && <p className="text-red-500 text-xs italic mt-1">Please provide the password</p>}
        </div>

        <div>
          {formError && <p className="text-red-500 text-sm italic mb-3">{formError}</p>}
        </div>

        <div>
          <input
            type="submit"
            value="Log in"
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm

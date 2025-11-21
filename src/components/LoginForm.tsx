import { useForm, type SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
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

  const { actions } = useUser()

  const [formError, setFormError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LoginCredentials> = async (userData: LoginCredentials) => {
    setFormError("")
    setLoading(true)
    try {
      const _user = { email: userData.email.trim(), password: userData.password.trim() }
      await actions.loginUser(_user)
      reset({ email: "", password: "" })
      onSuccess()
    } catch (err: any) {
      setFormError(err?.response?.data?.message || "Invalid email or password")
    } finally {
      setLoading(false)
    }
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
          <button
            type="submit"
            disabled={loading}
            className='primary-btn disabled:opacity-50'
          >
            {loading ? 'LOGGING IN...' : 'LOG IN'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

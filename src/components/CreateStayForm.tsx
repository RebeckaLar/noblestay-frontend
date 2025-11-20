import { useStay } from "@/contexts/StayContext"
import { useForm, type SubmitHandler } from "react-hook-form";

const CreateStayForm = () => {

    const { stays } = useStay()

    const {
      register,
      setValue,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm<Stay>({
    });

    const onSubmit: SubmitHandler<Stay> = (data) => {
        console.log("Create stay form submitted")
    }


  return (
    <div>CreateStayForm
        //axios anrop för skapa listing
        //sen svaret
        //lägger in i creatlistingunction från StayContext
        //i context funk satte /uppdatera jagalla mina
    </div>
  )
}
export default CreateStayForm
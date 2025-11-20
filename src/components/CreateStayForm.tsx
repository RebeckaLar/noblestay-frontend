import { useUser } from "@/contexts/UserContext";
import { useStay } from "../contexts/StayContext"
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "@/api/axios";
import { useState } from "react";

type StayFormData = {
      title: string;
      description: string;
      location: string,
      price: number,
      availableEvent: boolean,
      image: string,
      owner: User['_id']

};

// type DefaultData = {
//   owner: User['_id']
//   rules: string,
// }

// type defaultRules = {
//   owner: 
// }

// type CreateStayFormData = Omit<Stay, '_id' | 'owner' | 'bookings' | 'guestType' | 'numberOfGuests' | 'room' >

const CreateStayForm = () => {

    const { stays, actions } = useStay()
    const { currentUser } = useUser()
    const [loading, setLoading] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<StayFormData>({
    });

    const onSubmit: SubmitHandler<StayFormData> = async (data) => {
      console.log(data)
      console.log("Create stay form submitted")
        const res = await axios.post('api/stays', data, {
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
            }
        })

      actions.createStay(res.data);
    }


  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <p>
        CreateStayForm
        //axios anrop för skapa listing
        //sen svaret
        //lägger in i creatlistingunction från StayContext
        //i context funk satte /uppdatera jagalla mina
      </p>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                {/* TITLE */}
                <div className="mb-4">
                    <label className="block mb-2" >Title: </label>
                    <input className='border' {...register("title", { required: true })} />
                    {errors.title && errors.title.type === "required" && <p className="text-red-600 text-sm italic mt-1">Please provide the castle title</p>}
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label>Description: </label>
                    <textarea className='border w-full p-2 rounded' id='description' {...register("description", { required: true })} />
                    {errors.description && errors.description.type === "required" && <p className="text-red-600 text-sm italic">Please provide a description for the castle stay</p>}
                </div>

                {/* LOCATION */}
                <div className="mb-4">
                    <label className="block mb-2" >Location: </label>
                    <input className='border' {...register("location", { required: true })} />
                    {errors.location && errors.location.type === "required" && <p className="text-red-600 text-sm italic mt-1">Please provide the location of the castle stay</p>}
                </div>

                {/* PRICE */}
                <div className="mb-4">
                    <label className="block mb-2" >Price (1 adult, standard room): </label>
                    <input className='border' {...register("price", { required: true })} />
                    {errors.price && errors.price.type === "required" && <p className="text-red-600 text-sm italic mt-1">Please provide price of the castle stay</p>}
                </div>

                <div className="mb-4 flex flex-col gap-2">
                  <p>Will there be an event for booked guests to participate in?</p>
                  <label>
                  <input className="mx-1" type="radio" id="eventAvailable" value="true" {...register("availableEvent")} />
                  Yes, an event is available for booked guests
                  </label>

                  <label>
                  <input  className="mx-1" type="radio" id="evenNotAvailable" value="false" {...register("availableEvent")} />
                  No, there is no event yet
                  </label>
                </div>

                <div className="mb-4">
                    <label className="block mb-2" >Castle image URL: </label>
                    <input type="url" id="castleImg" className='border w-full' {...register("image", { required: true })} />
                    {errors.location && errors.location.type === "required" && <p className="text-red-600 text-sm italic mt-1">Please provide an image of the castle</p>}
                  {/* <img src="https://images.unsplash.com/photo-1756157508043-104c0173dd59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Trulli" width="500" height="333"></img> */}
                </div>

                <p className='paragraph mb-2 text-(--grey)'>Your email will be displayed for viewers of this stay</p>
                <button type='submit' className='primary-btn'>Publish stay</button>

      </form>
    </div>
  )
}
export default CreateStayForm
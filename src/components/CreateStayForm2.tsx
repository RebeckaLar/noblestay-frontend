// Track selected tags in form state.
// Add/remove tags when user toggles them.
// Submit as an array of StayTag objects.

import { useForm, type SubmitHandler } from 'react-hook-form'
import { useStay } from '../contexts/StayContext';
import { useUser } from '../contexts/UserContext';
// import Tag from "./Tag";
import { useState } from 'react';

type CreateStayFormProps = {
    defaultRules: Stay['rules'],
}

// type CreateStayFormData = Omit<Stay, '_id' | 'creator' | 'creationDate'>
type CreateStayFormData = Omit<Stay, '_id'>


export default function CreateStayForm({ defaultRules }: CreateStayFormProps) {
    // const { stays, tags, actions } = useStay();
    const { stays, actions } = useStay();
    const { currentUser } = useUser();
      const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    // const [selectedTag, setSelectedTag] = useState<StayTag>();

    const {
  register,
  setValue,
  getValues,
  handleSubmit,
  formState: { errors },
} = useForm<CreateStayFormData>({
});


//   useEffect(() => {
//     if (isSubmitted) {
//       reset()
//     }
//     setIsSubmitted(false)
//     setFormError("")
//   }, [isSubmitted, reset])

    const onSubmit: SubmitHandler<CreateStayFormData> = (data) => {
        console.log("Create stay form submitted")

        if (!currentUser) {
            return
        }
        const newStay: Stay = {
                title: data.title,
                description: data.description,
                rules: defaultRules,
                owner: {  userName: currentUser.userName, email: currentUser.email, password: currentUser.password, _id: currentUser._id, },
                location: data.location,
                bookings: data.bookings,
                guestType: data.guestType,
                numberOfGuests: data.numberOfGuests,
                room: data.room,
                price: data.price,
                availableEvent: data.availableEvent,
                image: data.image,
        }
        actions.createStay(newStay);

        return
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-8">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                {/* TITLE */}
                <div className="mb-4">
                    <label className="block mb-2" >Title: </label>
                    <input className='border' {...register("title", { required: true })} />
                    {errors.title && errors.title.type === "required" && <p className="text-red-600 text-sm italic mt-1">Please provide the castle title</p>}
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

                <div>
                    <label>Description: </label>
                    <textarea className='border w-full p-2 rounded' id='description' {...register("description", { required: true })} />
                    {errors.description && errors.description.type === "required" && <p className="text-red-600 text-sm italic">Please provide a description for the castle stay</p>}
                </div>

                <p className='paragraph'>Your email will be displayed for viewers of this listing</p>
                <button type='submit' className='primary-btn'>Publish stay</button>

            </form >
        </div >
    )
}
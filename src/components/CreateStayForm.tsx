// Track selected tags in form state.
// Add/remove tags when user toggles them.
// Submit as an array of StayTag objects.

import { useForm, type SubmitHandler } from 'react-hook-form'
import { useStay } from '../contexts/StayContext';
import { useUser } from '../contexts/UserContext';
// import Tag from "./Tag";
import { useState } from 'react';
import { useNavigate } from 'react-router';

type CreateStayFormProps = {
    defaultRules: Stay['rules'],
}

// type CreateStayFormData = Omit<Stay, 'id' | 'creator' | 'creationDate'>
type CreateStayFormData = Omit<Stay, '_id' | 'creator' | 'creationDate'>


export default function CreateStayForm({ defaultRules }: CreateStayFormProps) {
    // const { stays, tags, actions } = useStay();
    const { stays, actions } = useStay();
    const { currentUser } = useUser();
    const navigate = useNavigate()
    // const [selectedTag, setSelectedTag] = useState<StayTag>();

    const creationDate = new Date().toLocaleDateString("sv-SE");

    const {
  register,
  setValue,
  getValues,
  handleSubmit,
  formState: { errors },
  watch
} = useForm<CreateStayFormData>({
//   defaultValues: {
//     tags: [], // ✅ Empty array by default
//   }
});

// const toggleTag = (tag: StayTag) => {
//   const currentTags = getValues("tags") || [];
//   const tagExists = currentTags.some(t => t.id === tag.id);

//   const newTags = tagExists
//     ? currentTags.filter(t => t.id !== tag.id)
//     : [...currentTags, tag];

//   setValue("tags", newTags, { shouldValidate: true });
// };

    const onSubmit: SubmitHandler<CreateStayFormData> = (data) => {
        console.log("Create stay form submitted")
        // console.log(data.tags)

        if (!currentUser) {
            return
        }

        if (currentUser) {
            // if(data.category == "QNA") {
                const newStay: Stay = {
                    // id: stays.length > 0 ? Math.max(...stays.map(t => t.id)) + 1 : 1,
                    // title: data.title,
                    // category: data.category,
                    // description: data.description,
                    // creationDate: creationDate,
                    // creator: {  id: currentUser.id, userName: currentUser.userName, password: currentUser.password},
                    // tags: data.tags,
                    // commentsLocked: data.commentsLocked,
                    // isAnswered: false,
                    // commentAnswerId: 0,
                    //_id: stays.length > 0 ? Math.max(...stays.map(t => Number(t._id))) + 1 : 1,
                        title: data.title,
                        description: data.description,
                        rules: defaultRules,
                        owner: {  userName: currentUser.userName, email: currentUser.email, password: currentUser.password, uid: currentUser.uid, },
                        // {
                        //     type: mongoose.Schema.Types.ObjectId;
                        //     ref: "User";
                        //     required: true,
                        // };
                        location: data.location,
                        bookings: data.bookings,
                        // [{
                        //     type: mongoose.Schema.Types.ObjectId;
                        //     ref: "Booking";
                        // }];
                        guestType: data.guestType,
                        numberOfGuests: data.numberOfGuests,
                        room: data.room,
                        price: data.price,
                        availableEvent: data.availableEvent,
                        image: data.image,
                }
                actions.createStay(newStay);
                navigate('/stays');
                // onClose?.();
        }

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
{/* 
                <div className="mb-4">
                    <label className="block mb-2" >Kategori: </label>
                    <div className=''>
                        <select
                            className='border'
                            required
                            {...register("category", { validate: (value) => value !== 'NoCategory' })}
                            onChange={e => setValue("category", e.target.value as StayCategory, { shouldValidate: true })}
                        >
                            <option value="NoCategory">Välj:</option>
                            <option value="QNA">QNA</option>
                            <option value="Diskussion">Diskussion</option>
                            <option value="Meddelande">Meddelande</option>
                            <option value="Hitta gruppmedlem">Hitta gruppmedlem</option>
                        </select>
                        {errors.category && errors.category.type === "validate" && <p className="text-red-600 text-sm italic mb-5 mt-1">Vänligen välj en kategori till tråden</p>}
                    </div>
                </div> */}

                {/* <div>
  <label className="block mb-2">Taggar: </label>
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => {
      const selectedTags = watch("tags") || [];
      const isSelected = selectedTags.some((t) => t.id === tag.id);

      return (
        <Tag
          key={tag.id}
          tag={tag}
          selected={isSelected}
          onToggle={toggleTag}
        />
      );
    })}
  </div>
  {errors.tags && <p className="text-red-600 text-sm italic">Vänligen välj minst en tagg</p>}
</div> */}


                <div>
                    <label>Description: </label>
                    <textarea className='border w-full p-2 rounded' id='description' {...register("description", { required: true })} />
                    {errors.description && errors.description.type === "required" && <p className="text-red-600 text-sm italic">Please provide a description for the castle stay</p>}
                </div>

                <p className='paragraph'>Your email will be displayed for viewers of this listing</p>
{/* 
                <div className='mb-3'>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="form-checkbox" {...register("commentsLocked")} />
                        <span className="ml-2">Låsa kommentarer?</span>
                    </label>
                </div> */}
                                <button
                    type='submit'
                    className='primary-btn'
                >
                    Publish stay
                </button>

            </form >
        </div >
    )
}
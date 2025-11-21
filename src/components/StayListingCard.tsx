import { useStay } from "@/contexts/StayContext"
import { useUser } from "@/contexts/UserContext"
import { useNavigate } from "react-router"

const StayListingCard = () => {

    const { stays, actions } = useStay()
    const { currentUser } = useUser()
    const navigate = useNavigate()
    console.log(stays)

  return (
        <div className="listing-cards grid grid-cols-1 gap-10">
          {stays.map((s, i) => {
            const hasImage = s.image && String(s.image).trim() !== '';
            
            return (
            <div key={i} 
            onClick={() => navigate(`/stays/${s._id}`, {
                state: { from: "/", flash: "Welcome to your dashboard!" },
                })} 
              className="shadow-md rounded-xl pb-6 flex flex-col">
              {hasImage && (
                <img 
                  src={String(s.image)} 
                  alt={String(s.title)}
                  className="rounded-t-xl w-full h-55 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <div className={`bg-gray-300 rounded-t-xl w-full min-h-55 flex items-center justify-center text-gray-500 ${hasImage ? 'hidden' : ''}`}>
                No image
              </div>

              <div className="lower-half px-4 h-full flex flex-col">
                <div className="py-3">
                  <h6>{s.title}</h6>
                  <p className="caption">{s.location}</p>
                </div>

                <div className="space-y-3 h-full flex flex-col justify-between">
                  <p className="paragraph line-clamp-5">{s.description}</p>
                  <hr className="solid text-(--grey)"></hr>

                  <div className="flex justify-between items-center">
                    <p className="body-small">{String(s.price)} kr / night</p>
                    <button className="primary-btn" type="button">Read more</button>
                  </div>

                </div>
              </div>
            </div>
            )
          })}
        </div>
  )
}
export default StayListingCard
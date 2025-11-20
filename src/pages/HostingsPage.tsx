import CreateStayForm from "@/components/CreateStayForm"
import { useStay } from "@/contexts/StayContext"
import { useUser } from "@/contexts/UserContext"
import { useNavigate } from "react-router"



const HostingPage = () => {

  const { user } = useUser()
  const { stays } = useStay()
  const navigate = useNavigate()

  console.log('HostingsPage - user:', user)
  console.log('HostingsPage - stays:', stays)

  if(!user) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <h5>Please log in to view your hostings</h5>
      </div>
    )
  }

  // Filter stays where the owner matches the current user
  const userHostings = stays.filter((stay) => {
    // Handle both populated owner object and owner ID string
    const ownerId = typeof stay.owner === 'string' ? stay.owner : stay.owner?._id
    return ownerId === user._id
  })

  console.log(userHostings)

  return (
    <div className="container mx-auto px-4 mt-6">
      <h5 className="m-3">My Hostings</h5>

      <div className="listing-cards grid grid-cols-1 sm:grid-cols-2 gap-6">
        {userHostings.length > 0 ? (
          userHostings.map((s, i) => (
            <div key={i} 
            onClick={() => navigate(`/stays/${s._id}`, {
                state: { from: "/hostings" },
                })} 
              className="shadow-md rounded-xl pb-6 flex flex-col cursor-pointer">
              <div className="bg-gray-300 rounded-t-xl w-full min-h-55"></div>

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
          ))
        ) : (
          <div className="col-span-full">
            <p className="paragraph text-gray-500">You're not hosting any stay yet. Create a stay below!</p>
          </div>
        )}
      </div>

      <CreateStayForm  />
    </div>
  )
}
export default HostingPage
import { useNavigate } from "react-router-dom";

type StayProps = {
   stays: Stay[];
};


const HorizontalList = ({ stays }: StayProps) => {
const navigate = useNavigate()

  return (
      <div className="mt-6">
        <h5 className="m-3">Scandinavia</h5>
        <div className="overflow-x-auto overflow-y-hidden space-y-10 flex gap-(--spacing-xs)">
          {/* {stays.map((s, i) => (
            <div key={i} 
            onClick={() => navigate(`/stays/${s._id}`, {
            state: { from: "/" },
            })} 
              className="ml-3 shadow-md rounded-xl h-full pb-6"> */}
{stays.map((s, i) => {
            const hasImage = s.image && String(s.image).trim() !== '';
            
            return (
            <div key={i} 
            onClick={() => navigate(`/stays/${s._id}`, {
                state: { from: "/", flash: "Welcome to your dashboard!" },
                })} 
              className="ml-3 shadow-md rounded-xl h-full pb-6">
              {hasImage && (
                <img 
                  src={String(s.image)} 
                  alt={String(s.title)}
                  // className="rounded-t-xl w-full h-55 object-cover"
                  className="rounded-t-xl w-40 h-28 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              )}
              <div className={`bg-gray-300 rounded-t-xl w-full min-h-55 flex items-center justify-center text-gray-500 ${hasImage ? 'hidden' : ''}`}>
                No image
              </div>
{/* 
              <div className="bg-gray-300 rounded-t-xl w-40 h-28"></div> */}
              <div className="lower-half p-2">
                <p className="paragraph">{s.title}</p>
                <div className="flex flex-col text-sm">
                  <p className="caption text-(--grey)">{s.location}</p>
                  <p className="body-small">{String(s.price)} kr / night</p>
                </div>
              </div>
            </div>
          )
})}
        </div>
      </div>
  )
}
export default HorizontalList
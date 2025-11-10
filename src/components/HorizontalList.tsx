import { useState } from "react"
import { dummyStays } from "../data/stays"

type Props = {
  onStayClick: (stay: Stay) => void;
};

const HorizontalList = ({onStayClick}: Props) => {

const [stays, setStays] = useState(dummyStays)

  return (
      <div className="mt-6">
        <h5 className="m-3">Scandinavia</h5>
        <div className="overflow-x-auto overflow-y-hidden space-y-10 flex gap-(--spacing-xs)">
          {stays.map((s, i) => (
            <div key={i} onClick={() => onStayClick(s)} className="ml-3 shadow-md rounded-xl h-full pb-6">
              <div className="bg-gray-300 rounded-t-xl w-40 h-28"></div>
              <div className="lower-half p-2">
                <p className="paragraph">{s.title}</p>
                <div className="flex flex-col text-sm">
                  <p className="caption">{s.location}</p>
                  <p className="body-small">{String(s.price)} kr / night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}
export default HorizontalList
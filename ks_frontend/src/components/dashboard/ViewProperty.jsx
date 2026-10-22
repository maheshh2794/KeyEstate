import { useSelector } from "react-redux"

function ViewProperty() {

    const property = useSelector((state)=>state.Ruser.property)
  return (
    <div>
        {property.title}
    </div>
  )
}

export default ViewProperty
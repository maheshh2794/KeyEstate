
function AddProperty() {
  return (
    <div>
        <h1>Add Property</h1>
        title: <input type="text" name="title" /><br />
        description: <input type="text" name="description" /><br />
        prototype: <input type="text" name="prototype" /><br />
        listedType: <input type="text" name="listedType" /><br />
        price: <input type="text" name="price" /><br />
        Address:
        street: <input type="text" name="street" /><br />
        locality: <input type="text" name="locality" /><br />
        city: <input type="text" name="city" /><br />
        state: <input type="text" name="state" /><br />
        pincode: <input type="text" name="pincode" /><br />
        bedrooms: <input type="text" name="bedrooms" /><br />
        bathrooms: <input type="text" name="bathrooms" /><br />
        area: <input type="text" name="area" /><br />
        areaunit: <input type="text" name="areau" /><br />
        furnishing: <input type="text" name="furnishing" /><br />
        image: <input type="text" name="image" /><br />
        amenities: <input type="text" name="amenities" /><br />
        listedBy: <input type="text" name="listedBy" /><br />
        status: <input type="text" name="status" /><br />
        isavailable: <input type="text" name="isavailable" /><br />
        <button>Add Property</button>

    </div>
  )
}

export default AddProperty
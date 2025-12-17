import { useParams } from "react-router"

const ProductDetails = ()=>{

    

    const {id} = useParams()
    return (
        <h1>Product Details: {id}</h1>

    )
}
export default ProductDetails
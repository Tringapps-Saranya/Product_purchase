import { useAppSelector } from "../../../redux/hooks";
import '../components/Displayretailer.css'
const Displayretailer = () => {
    const retailerDetails = useAppSelector(state=>state.retailer.retailerDetails)
    return(
        <div className = "displaydetails">
        {
            retailerDetails.map((retailerDetail)=>{
                return(
                    <div>
                    <div className = "retailerdetails">
                       <div> NAME    : &nbsp;&nbsp;&nbsp;&nbsp;{retailerDetail.retailer_name} </div>
                       <div> ADDRESS : &nbsp;{retailerDetail.retailer_address} </div>
                    </div> 
                     <div className="productdetails">  
                        { retailerDetail.products.length !== 0 ? retailerDetail.products.map((product)=>{
                        return(
                            <div className='products'>
                                <div className='date'>{product.purchase_date}</div>
                                <div><label className = "fields">Name     : {product.product_name}</label></div>
                                <div><label className = "fields">Quantity : {product.quantity}</label></div>
                            </div>
                        )
                       
                       }):<p>No Orders</p>}
                     
                     </div>
                    </div>
                )
            })
        }
    </div>
    )
}

export default Displayretailer;
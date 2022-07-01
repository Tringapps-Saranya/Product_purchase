import { useState, ChangeEvent } from "react"
import { Backdrop, Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import DeleteIcon from '@mui/icons-material/Delete'
import { addProduct } from '../../../redux/retailerslice';
import '../components/Overlaycomponent.css'

type setOpenType = (type: boolean) => void

type currentuserType = {
    currentuser: string,
    open: boolean,
    setOpen: setOpenType
}

type productType = {
    productDetails: {
        product_id: string,
        product_name: string,
        quantity: number,
        product_price: number,
        purchase_date: string
    }[]
}

const Overlaycomponent = ({ currentuser, open, setOpen }: currentuserType) => {

    const dispatch = useAppDispatch();
    const retailerDetails = useAppSelector(state => state.retailer.retailerDetails)
    const wholesaleDetails = useAppSelector(state => state.wholesale.products)
    const [checkProduct,setCheckProduct] = useState('')
    const currentdate =  new Date().toLocaleDateString;

    const handleClose = () => {
        setOpen(!open);
    };

    const handleChange = (event: ChangeEvent<HTMLSelectElement>, index: number) => {
        let productname = event.target.value
        const findProduct = wholesaleDetails.find((product: any) => product.product_name === productname)
        console.log(findProduct)
        findProduct && setValue(`productDetails.${index}.product_name`, productname)
        findProduct && setValue(`productDetails.${index}.product_price`, findProduct?.product_price)
        console.log("currentdate" , currentdate)
        findProduct && setValue(`productDetails.${index}.purchase_date`, currentdate())
    }

    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<productType>({
        defaultValues: {
            productDetails: [{
                product_id: uuidv4(),
                product_name: '',
                quantity: 1,
                product_price: 0,
                purchase_date: ""
            }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        name: "productDetails",
        control
    })

    const buy = useWatch({
        control,
        name: 'productDetails'
    })

    const getQuantity = (product_name: string) => {
        console.log(wholesaleDetails.find((product: any) => product.product_name === product_name)?.quantity)
        return wholesaleDetails.find((product: any) => product.product_name === product_name)?.quantity
    }

    
    const addItem = () => {
        if(buy[fields.length - 1].product_name !== '') 
        {
            append({product_id:uuidv4(),product_name:'',quantity:1}) 
            setCheckProduct(buy[fields.length-1].product_name)
        }
        else    
            alert("Enter Valid Details")
        
    }

    const onSubmit = (data: productType) => {
        const sendData = {
            products: data.productDetails,
            current_user: currentuser
        }
        console.log(sendData);
        dispatch(addProduct(sendData));
        handleClose()
    }

    return (
        <div>
            <div>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <Box sx={{ width: 1350, margin: "40px", height: "auto", backgroundColor: 'ivory' }}>
                        <div className="header">
                            <div className='title'>
                                {currentuser}
                            </div>
                            <div>
                                <Button sx={{ margin: '30px', backgroundColor: "#f6ead4" ,color:"black" ,fontWeight:"bold"}} variant='contained' onClick = {addItem}>Add</Button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="forms">
                                <div className="columns">
                                    <div className="fieldnames">Productname</div>
                                    <div className="fieldnames"> Quantity</div>
                                    <div className="fieldnames">Price (in Rs)</div>
                                    <div className="fieldnames">Total</div>
                                    <div className="fieldnames">Delete</div>
                                </div>
                                {
                                    fields.map((fields, index) => {
                                        return (
                                            <>

                                                <div key={fields.product_id}>
                                                    <div className="productform">
                                                       <div className="productbox">
                                                            <select {...register(`productDetails.${index}.product_name` as const, {
                                                                required: true
                                                            })} onChange={(event) => handleChange(event, index)}>
                                                                {
                                                                    wholesaleDetails.map((product: any) => {
                                                                        return (
                                                                            <option value={product.product_name}>{product.product_name}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div> 
                                                        {buy[index]?.product_name &&
                                                            <div className="productbox"><input type="number" placeholder="Quantity" 
                                                                {...register(`productDetails.${index}.quantity` as const, {
                                                                    required:  true, min:1 ,max:getQuantity(buy[index].product_name) ,
                                                                    valueAsNumber: true
                                                                })} />
                                                            </div>
                                                        }
                                                        {errors.productDetails && (<p>{errors.productDetails.message}</p>)}
                                                        {buy[index]?.product_name &&
                                                            <>
                                                                <div className="productbox">{getValues(`productDetails.${index}.product_price`)}</div>
                                                                <div className="productbox">{getValues(`productDetails.${index}.quantity`) * (getValues(`productDetails.${index}.product_price`))}</div>
                                                                {fields.length > 1 && <div className="productbox"><DeleteIcon sx={{color:"red"}}onClick={() => remove(index)}/></div>}
                                                            </>
                                                        }

                                                    </div>


                                                </div>

                                            </>
                                        )

                                    })
                                }
                                <div className="buttons">
                                    <Button sx={{backgroundColor:"green"}} className="handlebutton" type="submit" variant="contained">Supply</Button>
                                    <Button sx={{backgroundColor:"red"}} className="handlebutton" variant='contained' onClick={handleClose}>Cancel</Button>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Backdrop>
            </div>

        </div >
    )
}
export default Overlaycomponent


import { useState } from 'react';
import retailers from '../../../Jsondetails/retailer.json';
import '../components/Headercomponent.css';
import { Button } from '@mui/material';
import Overlaycomponent from '../../Overlay/components/Overlaycomponent'
import Displayretailer from "../../Displayretailer/components/Displayretailer";
const Headercomponent = () => {

    const [retailerName, setRetailerName] = useState("");
    const [retailerAddress, setRetailerAddress] = useState("");

    const [open, setOpen] = useState(false);

    
    const handleClick = (retaileraddress: string, retailername: string) => {
        setOpen(!open);
        setRetailerAddress(retaileraddress);
        setRetailerName(retailername);
    }
    return (
        <div>
            <div className='heading'>
                <div className='title'>
                    FOOD-COURT
                </div>
                <div>
                    {
                        retailers.map((retailer) => {
                            return (
                                <>
                                    <Button className="retailerbuttons" variant='contained' onClick={() => { handleClick(retailer.retailer_address, retailer.retailer_name) }}>{retailer.retailer_name}</Button>
                                </>
                            )
                        })
                    }
                    
                </div>
                
            </div>
            <Overlaycomponent currentuser={retailerName} retailerAddress={retailerAddress }open={open} setOpen={setOpen} />
            <Displayretailer />
        </div>
    )
}

export default Headercomponent


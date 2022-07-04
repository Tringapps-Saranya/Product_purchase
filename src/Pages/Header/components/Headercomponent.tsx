import { useState } from 'react';
import retailers from '../../../Jsondetails/retailer.json';
import '../components/Headercomponent.css';
import { Button } from '@mui/material';
import Overlaycomponent from '../../Overlay/components/Overlaycomponent'
import Displayretailer from "../../Displayretailer/components/Displayretailer";
const Headercomponent = () => {
    const [retailerDetails, setRetailerDetails] = useState(retailers);
    const [retailerName, setRetailerName] = useState("");
    const [retailerAddress, setRetailerAddress] = useState("");

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

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
                        retailerDetails.map((retailers) => {
                            return (
                                <>
                                    <Button className="retailerbuttons" variant='contained' onClick={() => { handleClick(retailers.retailer_address, retailers.retailer_name) }}>{retailers.retailer_name}</Button>
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

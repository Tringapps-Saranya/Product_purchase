import Headercomponent from '../components/Headercomponent';
import  store from '../../../redux/store';
import { Provider } from 'react-redux';
import {fireEvent,screen,render} from '@testing-library/react';


test("check Retailer Details in page header",()=>{
    render(
        <Provider store = {store}>
            <Headercomponent/>
        </Provider>
    );

    const linkElement = screen.getByText(/FOOD-COURT/i);
    expect(linkElement).toBeInTheDocument();

})

test("check Retailer Details in page header",()=>{
    render(
        <Provider store = {store}>
            <Headercomponent/>
        </Provider>
    );

    store.getState().retailer.retailerDetails.forEach((retailer)=>{
        const retailerName = screen.getByText(retailer.retailer_name);
        fireEvent.click(retailerName)

    })
})
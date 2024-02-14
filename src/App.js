import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Pages/layout';
import Parties from './Parties/Parties';
import PartiesForm from "./Parties/PartiesForm";
import Items from './Items/Items';
import ItemForm from "./Items/ItemForm";
import Sales from "./Sales/Sales";
import SalesForm from "./Sales/SalesForm";






import './App.css';

function App() {

    return (
        

        <ChakraProvider>

            <Routes>
                <Route path='/' element={<Layout />}>
                   
                    <Route index  element={<Parties />} />
                    <Route path='parties_form'element={<PartiesForm/>}/>
                    <Route path='items'element={<Items />}/>
                    <Route path='item_form'element={<ItemForm/>}/>
                    <Route path='sales'element={<Sales/>}/>
                    <Route path='sales_form'element={<SalesForm/>}/>
                    
                   

                </Route>
            </Routes>
        
        </ChakraProvider>

    )
}

export default App;

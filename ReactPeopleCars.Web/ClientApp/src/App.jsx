import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AddPerson from './Pages/AddPerson';
import AddCar from './Pages/AddCar';
import DeleteCars from './Pages/DeleteCars';
import Layout from './Layout';

class App extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/addperson' element={<AddPerson />} />
                    <Route exact path='/addcar/:personId' element={<AddCar />} />
                    <Route exact path='/deletecars/:personId' element={<DeleteCars />} />
                </Routes>
            </Layout>
        );
    }

};

export default App;
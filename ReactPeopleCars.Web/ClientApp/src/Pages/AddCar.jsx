import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddCar = () => {
    const [car, setCar] = useState({ make: '', model: '', year: '' });
    const [person, setPerson] = useState({ firstName: '', lastName: '' });

    const { personId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getPerson = async () => {
            const { data } = await axios.get(`/api/peoplecars/getperson?id=${personId}`);
            setPerson(data);
        }

        getPerson();
    }, [personId]);

    const onTextChange = e => {
        const carCopy = { ...car };
        carCopy[e.target.name] = e.target.value;
        setCar(carCopy);
    }

    const onSubmitClick = async () => {
        const { make, model, year } = car;
        await axios.post('/api/peoplecars/addcar', { make, model, year, personId });
        navigate('/');
    }

    const onRandomClick = async () => {
        const randomId = await getRandomPersonId();
        navigate(`/addcar/${randomId}`);
    }

    const getRandomPersonId = async () => {
        const { data } = await axios.get('/api/peoplecars/getall');
        const ids = data.map(p => p.id);
        return ids[Math.floor(Math.random() * ids.length)];
    }

    const { make, model, year } = car;
    const { firstName, lastName } = person;

    return (
        <div style={{ minHeight: 1000, paddingTop: 200 }}>
            <div className="row">
                <div className='col-md-6 offset-md-3 card bg-light p-4'>
                    {firstName && <h2>Add a car for {firstName} {lastName.toUpperCase()}</h2>}
                    <input type="text" className='form-control' name='make' value={make} onChange={onTextChange} placeholder="Make" />
                    <br />
                    <input type="text" className='form-control' name='model' value={model} onChange={onTextChange} placeholder="Model" />
                    <br />
                    <input type="text" className='form-control' name='year' value={year} onChange={onTextChange} placeholder="Year" />
                    <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={onSubmitClick}>Submit</button>
                    <button className='btn btn-dark btn-lg btn-block' onClick={onRandomClick}>Go To Random Person</button>
                </div>
            </div>
        </div>
    )
}

export default AddCar;
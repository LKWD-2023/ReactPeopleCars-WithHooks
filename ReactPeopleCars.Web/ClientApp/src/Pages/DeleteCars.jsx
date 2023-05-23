import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarRow from '../components/CarRow';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteCars = () => {
    const [cars, setCars] = useState([]);
    const [searchText, setSearchText] = useState('');
    const searchTextLower = searchText.toLowerCase();
    const { personId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getCars = async () => {
            const { data } = await axios.get(`/api/peoplecars/getcars`, { params: { personId } });
            setCars(data);
        }

        getCars();
    }, []);

    const onDeleteAllClick = async () => {
        await axios.post('/api/peoplecars/deletecars', { personId });
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
            <SearchBox
                searchText={searchText}
                placeholder="Search Cars"
                onTextChange={e => setSearchText(e.target.value)}
                onClearClick={() => setSearchText('')}
            />
            <div className="row mt-5">
                <div className="col-md-12">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars
                                .filter(c => `${c.make.toLowerCase()} ${c.model.toLowerCase()}`.includes(searchTextLower))
                                .map(c => <CarRow car={c} key={c.id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3>Are you sure you want to delete all of these cars?</h3>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button className='btn btn-primary btn-lg w-100'>No</button>
                    </Link>
                </div>
                <div className="col-md-6" style={{ marginTop: 20 }}>
                    <button onClick={onDeleteAllClick} className='btn btn-danger btn-lg w-100'>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCars;
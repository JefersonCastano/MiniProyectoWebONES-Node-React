import React from 'react'
import { useState, useEffect } from 'react'
import { useCommonContext } from './CommonContext';
import { showConfirmationMessage } from '../utilities/Messages';
import Pagination from './Pagination';

const ListItems = ({ keys }) => {

    const { items,
        itemsShown, setItemsShown, 
        selectedItem, setSelectedItem,
        states, updateState,
        getItems, getItemBy, changeStateItem } = useCommonContext();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    useEffect(() => {
        getItems();
    }, []);

    const handleActiveState = async (newState) => {
        showConfirmationMessage(async () => {
            const result = await changeStateItem(newState);
            if (result) await getItems();
        });
    };

    const handleSelect = async (itemId) => {
        setSelectedItem(itemId);
        updateState(states.consulting);
        await getItemBy(itemId);
    };

    const handleSearch = (value) => {
        setCurrentPage(1);
        setItemsShown(items);

        const words = value.toLowerCase().split(' ').filter(word => word !== '');
        if (words.length === 0) return;

        const filteredItems = items.filter(item => {
            const name = item[keys.name].toLowerCase();
            const surname = item[keys.surname]?.toLowerCase();
            return words.every(word => name.includes(word) || surname?.includes(word));
        });

        setItemsShown(filteredItems);
    }

    const handleNextPage = () => {
        if (indexOfLastItem < itemsShown.length) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (indexOfFirstItem > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <input className="form-control mr-sm-2 mb-3" type="search" placeholder="Buscar" aria-label="Buscar" onChange={(e) => handleSearch(e.target.value)} />
            <div className="card">
                <div className="card-body p-0">
                    <div className="dropdown">
                        <ul className="dropdown-menu">
                            {
                                itemsShown.slice(indexOfFirstItem, indexOfLastItem).map((item, index) => (
                                    <li key={index}>
                                        <div className="d-flex align-items-center">
                                            <a className={`dropdown-item  ${item[keys.active] == false ? 'text-muted disabledItem' : ''}  ${selectedItem === item[keys.id] ? 'active' : ''}`} href="#" onClick={() => handleSelect(item[keys.id])}>{keys.surname ? item[keys.surname] + ' ' + item[keys.name] : item[keys.name]}</a>
                                            {
                                                selectedItem === item[keys.id] && typeof item[keys.active] != 'undefined' &&
                                                (item[keys.active]  ?
                                                    <button type="button" className="btn btn-outline-danger btn-sm d-flex align-items-center me-2" onClick={() => handleActiveState(false)}>
                                                        <i className="bi bi-trash3 fs-7 "></i>
                                                    </button> :
                                                    <button type="button" className="btn btn-outline-success btn-sm d-flex align-items-center me-2" onClick={() => handleActiveState(true)}>
                                                        <i className="bi bi-check-circle fs-7 "></i>
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <Pagination prev={currentPage != 1} next={indexOfLastItem < itemsShown.length} onPrevious={handlePreviousPage} onNext={handleNextPage} />
        </div >
    )
}

export default ListItems
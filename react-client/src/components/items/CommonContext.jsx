import React from 'react'
import { useState, createContext, useContext } from 'react'

const commonContext = createContext({
    state: "",
    states: {},
    updateState: () => { },
    items: [],
    itemsShown: [],
    setItemsShown: () => { },
    selectedItem: '',
    setSelectedItem: () => { },
    setSelectedItem: () => { },
    selectedItemInfo: {},
});

export const useCommonContext = () => useContext(commonContext);

const CommonContext = ({ children, crudMethods, }) => {

    const [items, setItems] = useState([]);
    const [itemsShown, setItemsShown] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedItemInfo, setSelectedItemInfo] = useState({});

    const states = {
        closed: "closed",
        adding: "adding",
        editing: "editing",
        consulting: "consulting"
    };
    const [state, setState] = useState(states.closed);

    const updateState = (newState) => {
        if (newState in states) {
            setState(newState);
        } else {
            console.error("Invalid state");
        }
    }

    const methods = {
        getItems: async () => {
            const itemsResult = await crudMethods.get();
            if (itemsResult) {
                setItems(itemsResult)
                setItemsShown(itemsResult)
            }
        },
        getItemBy: async (id) => {
            const item = await crudMethods.getById(id);
            if (item) setSelectedItemInfo(item);
        },
        createItem: async (item) => {
            const result = await crudMethods.create(item);
            if (result) {
                updateState(states.consulting);
                return result;
            } else return false;
        },
        updateItem: async (item) => {
            const result = await crudMethods.update(selectedItem, item);
            if (result) {
                updateState(states.consulting);
                return true;
            } else return false;
        },
        changeStateItem: async (newState) => {
            if (newState) {
                return await crudMethods.changeState(selectedItem, newState);
            } else {
                return await crudMethods.changeState(selectedItem, newState);
            }
        }
    }

    return (
        <commonContext.Provider value={{
            state, states, updateState,
            items, 
            itemsShown, setItemsShown, 
            selectedItem, setSelectedItem, 
            selectedItemInfo, setSelectedItemInfo, 
            ...methods
        }}>
            {children}
        </commonContext.Provider>
    )
}

export default CommonContext
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [
        {
            name: 'Samsung A33 1',
            price: '4000000',
            stock: 4,
            id: 1,
        },
        {
            name: 'Iphone X 2',
            price: '10000000',
            stock: 3,
            id: 2,
        },
        {
            name: 'Blackberry 3',
            price: '1500000',
            id: 3,
            stock: 19
        },
        {
            name: 'Samsung A33 4',
            price: '4000000',
            id: 4,
            stock: 4
        },
        {
            name: 'Iphone X 5',
            price: '100000005',
            id: 5,
            stock: 3
        },
        {
            name: 'Blackberry 6',
            price: '1500000',
            id: 6,
            stock: 19
        },
        {
            name: 'Samsung A33 7',
            price: '4000000',
            id: 7,
            stock: 4
        },
        {
            name: 'Iphone X 8',
            price: '10000000',
            id: 8,
            stock: 3
        },
        {
            name: 'Blackberry 9',
            price: '1500000',
            id: 9,
            stock: 19
        },
    ],
    modal: false,
    showDeleteConfirmation: false,
    dataDeleted: null,
    editedData: null,
    productData: {
        name: '',
        price: 0,
        stock: '',
    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products = state.products.concat({...action.payload, id: state.products.length + 1})
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        },
        updateProduct: (state, action) => {
            console.log(action.payload)
            const {id, name, price, stock} = action.payload
            state.products = state.products.map(item => {
                return id === item.id ? {
                    name, price, stock
                } : item
            })
        },
        switchModal: (state, action) => {
            if (!action.payload) {
                state.editedData = null;
            }
            state.modal = action.payload
        },
        editProduct: (state, action) => {
            state.editedData = action.payload;
            state.modal = true;
        },
        switchDeleteConfirmation: (state, action) => {
            if (action.payload.show) {
                state.dataDeleted = {id: action.payload.data, name: action.payload.name}
            } else {
                state.dataDeleted = null
            }
            state.showDeleteConfirmation = action.payload.show
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProduct, switchModal, switchDeleteConfirmation, deleteProduct, editProduct, updateProduct } = productSlice.actions

export default productSlice.reducer
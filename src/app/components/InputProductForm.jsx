"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, switchModal, updateProduct } from "@/store/productSlice"


export default function InputProductForm() {
    const dispatch = useDispatch()
    const editedData = useSelector(state => state.product.editedData)
    
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')

    useEffect(() => {
        if (editedData) {
            setName(editedData.name)
            setPrice(editedData.price)
            setStock(editedData.stock)
        }
    }, [editedData])

    const [isNameError, setIsNameError] = useState(false)
    const [isPriceError, setIsPriceError] = useState(false)
    const [isStockError, setIsStockError] = useState(false)

    const onInputName = (event) => {
        setName(event.target.value)
    }
    const onInputPrice = (event) => {
        setPrice(event.target.value)
    }
    const onInputStock = (event) => {
        setStock(event.target.value)
    }

    const onFocusName = () => {
        setIsNameError(false)
    }
    const onFocusPrice = () => {
        setIsPriceError(false)
    }
    const onFocusStock = () => {
        setIsStockError(false)
    }

    const onAddProductData = () => {
        if (!name) {
            setIsNameError(true)
        }
        if (!price) {
            setIsPriceError(true)
        }
        if (!stock) {
            setIsStockError(true)
        }
        if (name && price && stock && !editedData) {
            dispatch(addProduct({ name, price, stock }))
            dispatch(switchModal(false))
        }
        if (name && price && stock && editedData) {
            dispatch(updateProduct({name, price, stock, id: editedData.id}))
            dispatch(switchModal(false))
        }
    }

    const onClickCancel = () => {
        dispatch(switchModal(false))
    }

    return (
        <div className="z-10 flex justify-center items-center fixed min-w-full h-[100vh] bg-gray-500/75 transition-opacity">
            <div className="bg-white rounded-xl p-8 w-1/3">
                <h1 className="text-2xl text-slate-700 font-bold mb-8">Fill Product Data</h1>
                <p className="text-slate-600 text-xl mb-2">Name</p>
                <input value={name} onFocus={() => onFocusName()} onInput={(e) => onInputName(e)} className={`${isNameError ? '' : 'mb-8 '}w-full text-slate-700 mb-2 bg-slate-100 rounded-lg px-4 py-2`} placeholder="Input product name" />
                {isNameError && <p className="text-red-500 mb-5 transition-all">Name is required</p>}
                <p className="text-slate-600 text-xl mb-2">Price</p>
                <div className="flex">
                    <span className="text-slate-600 mr-3 items-center">Rp.</span> <input value={price} onFocus={() => onFocusPrice()} onInput={(e) => onInputPrice(e)} type="number" className={`${isPriceError ? '' : 'mb-8 '} w-full text-slate-700 bg-slate-100 rounded-lg px-4 py-2`} placeholder="Input product price" />
                </div>
                {isPriceError && <p className="text-red-500 mb-5 transition-all">Price is required</p>}
                <p className="text-slate-600 text-xl mb-2">Stock</p>
                <input value={stock} onFocus={() => onFocusStock()} onInput={(e) => onInputStock(e)} type="number" className={`${isStockError ? '' : 'mb-16 '}w-full text-slate-700 bg-slate-100 rounded-lg px-4 py-2`} placeholder="Input remaining stock" />
                {isStockError && <p className="text-red-500 mb-16 transition-all">Stock is required</p>}
                <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-lg bg-red-100 transition-all delay-50 text-red-400 mr-3 hover:bg-red-200 hover:text-red-600" onClick={() => onClickCancel()}>Cancel</button>
                    <button className="px-4 py-2 rounded-lg bg-slate-200 transition-all delay-50 text-gray-500 hover:bg-blue-300 hover:text-gray-600" onClick={() => onAddProductData()}>Add Product</button>
                </div>
            </div>
        </div>
    )
}
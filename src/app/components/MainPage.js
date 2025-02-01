import ProductCard from "./ProductCard"
import InputProductForm from "./InputProductForm"
import DeleteConfirmation from "./DeleteConfirmation"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { switchModal } from "@/store/productSlice"

export default function MainPage() {
    const dispatch = useDispatch()
    const modal = useSelector((state) => state.product.modal)
    const isShowDeleteConfirmation = useSelector(state => state.product.showDeleteConfirmation)
    const products = useSelector((state) => state.product.products)

    const [displayedData, setDisplayedData] = useState([])

    useEffect(() => {
        setDisplayedData([...products])
    }, [products])

    const onClickAddProduct = () => {
        dispatch(switchModal(true))
    }
    const onSearch = (e) => {
        if (!e.target.value) {
            setDisplayedData(products)
            return
        }
        setDisplayedData(products.filter(item => item.name.toLowerCase().includes(e.target.value)))
    }

    const onClickSort = () => {
        setDisplayedData([...displayedData].sort((a,b) => a.name.localeCompare(b.name)))
    }

    return (
        <div className="relative">
            {
                modal &&
                <InputProductForm />
            }
            {
                isShowDeleteConfirmation &&
                <DeleteConfirmation />
            }

            <div className="p-10 w-screen min-h-screen bg-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl text-slate-600 font-medium">Total Products: {products.length || 0}</h1>
                    <div>
                        <input onInput={(e) => onSearch(e)} className="w-full text-slate-700 mb-2 bg-slate-200 rounded-lg px-4 py-2" placeholder="Search..." />
                        <button onClick={() => onClickSort()} className="px-4 py-2 rounded-lg bg-slate-200 transition-all delay-50 text-gray-500 mr-3 hover:bg-slate-300 hover:text-gray-600">Sort</button>
                        <button onClick={() => onClickAddProduct()} className="px-4 py-2 rounded-lg bg-slate-200 transition-all delay-50 text-gray-500 hover:bg-slate-300 hover:text-gray-600">Add Product</button>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
                    {
                        displayedData.map((item, index) => {
                            return (
                                <ProductCard name={item.name} price={item.price} stock={item.stock} id={item.id} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
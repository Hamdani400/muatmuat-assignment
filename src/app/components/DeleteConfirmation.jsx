import { useDispatch, useSelector } from "react-redux"
import { deleteProduct, switchDeleteConfirmation } from "@/store/productSlice"

export default function DeleteConfirmation() {
    const dispatch = useDispatch()
    const deletedData = useSelector(state => state.product.dataDeleted)

    const onClickConfirmation = () => {
        dispatch(deleteProduct(deletedData))
        dispatch(switchDeleteConfirmation({show: false, data: null}))
    }
    const onClickCancel = () => {
        dispatch(switchDeleteConfirmation({show: false, data: null}))
    }

    return (
        <div className="flex justify-center items-center fixed min-w-full h-[100vh] bg-gray-500/75 transition-opacity z-10">
        <div className="bg-white rounded-xl p-8 w-1/3">
            <h1 className="text-2xl text-slate-700 text-center font-bold mb-10">Are you sure to delete {deletedData.name}?</h1>
            <div className="flex justify-center">
            <button className="px-4 py-2 rounded-lg bg-red-100 transition-all delay-50 text-red-400 mr-3 hover:bg-red-200 hover:text-red-600" onClick={() => onClickCancel()}>Cancel</button>
            <button className="px-4 py-2 rounded-lg bg-slate-200 transition-all delay-50 text-gray-500 hover:bg-blue-300 hover:text-gray-600" onClick={() => onClickConfirmation()}>Yes</button>
        </div>
        </div>
    </div>
    )
}
import Image from "next/image"
import Dummy from "../../../assets/dummy.jpg"
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";
import { useDispatch } from "react-redux"
import {  switchDeleteConfirmation, editProduct } from "@/store/productSlice"

export default function ProductCard({ name, price, stock, id }) {
    const dispatch = useDispatch();

    const oncClickDelete = () => {
        dispatch(switchDeleteConfirmation({show: true, data: id, name: name}))
    }
    const oncClickEdit = () => {
        dispatch(editProduct({name, price, stock, id}))
    }

    const currency = (val) => {
        const format = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          });
          return format.format(val);
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden">
        <div className="h-[120px] sm:h-[15vw]">
        <MdDelete onClick={oncClickDelete} className="absolute cursor-pointer text-2xl ml-4 mt-4 text-white" />
        <FaPencil onClick={oncClickEdit} className="absolute cursor-pointer text-lg  ml-[50px] sm:ml-[3vw] mt-4 text-white" />
        <Image
        src={Dummy}
        className="w-full"
        alt="dummy phone picture"
        />
        </div>
        <div className="p-4 text-gray-600">
            <h3 className="text-sm sm:text-2xl font-extrabold">{name}</h3>
            <h4 className="text-sm sm:text-lg font-medium">{currency(price)}</h4>
            <h4 className="text-sm sm:text-lg text-slate-400 font-bold">Remaining: {stock}</h4>
            </div>
        </div>
    )
}
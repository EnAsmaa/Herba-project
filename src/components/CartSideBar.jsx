import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { Button } from '@heroui/react';
const minCount = 1;
const maxCount = 10;


export default function CartSideBar({ cartToggle, setCartToggle }) {
    const [cartProducts, setCartProducts] = useState([
        { id: 1, productName: 'herba1', count: 1 },
        { id: 2, productName: 'herba2', count: 1 },
        { id: 3, productName: 'herba3', count: 1 },
        { id: 4, productName: 'herba4', count: 1 },
        { id: 5, productName: 'herba5', count: 1 },
    ])

    const changeCount = (value, id) => {
        setCartProducts(prev =>
            prev.map(product => {
                if (product.id === id) {
                    const newCount = product.count + value
                    
                    if (newCount <= 10 && newCount >= 1) {
                        return { ...product, count: newCount }
                    }
                }
                return product
            })
        )
    }

    return <>
        <div className={` ${cartToggle ? 'pointer-events-auto right-0' : 'pointer-events-none -right-100'} w-80 h-screen fixed top-0 z-50 duration-400 flex flex-col bg-[#F7F7F7] text-[#1A242A] dark:bg-[#1A242A] dark:text-[#F7F7F7] gap-1`}>
            <div className="header flex justify-between items-center dark:text-black bg-gray-200 dark:bg-[#F7F7F7] p-3 text-2xl">
                <p className='font-semibold'>Cart</p>
                <FaXmark onClick={(e) => { setCartToggle(false); console.log(e) }} className='text-xl cursor-pointer' />
            </div>
            <div className="cart-content p-3">
                <ul className='w-full space-y-3'>
                    {cartProducts.map(product =>
                        <li key={product.id} className='flex justify-between items-center px-2 py-4 bg-gray-300 text-black rounded-md'>
                            <div className="productInfo space-y-2 w-2/3">
                                <p className='text-[#335D39] font-semibold text-lg'>{product.productName}</p>
                                <p className='text-nowrap'>Price: 55$</p>
                            </div>
                            <div className="count w-1/3 flex justify-between items-center text-2xl">
                                <CiSquarePlus onClick={() => { changeCount(1, product.id) }} className='cursor-pointer text-3xl' />
                                <p>{product.count}</p>
                                <CiSquareMinus onClick={() => { changeCount(-1, product.id) }} className='cursor-pointer text-3xl' />
                            </div>
                        </li>
                    )}
                </ul>
                <Button className='w-full rounded-md mt-3 bg-[#335D39]' variant='flat'>View All</Button>
            </div>
        </div>
    </>
}

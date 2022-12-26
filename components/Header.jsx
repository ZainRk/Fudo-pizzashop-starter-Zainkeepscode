import css from '../styles/Header.module.css'
import Image from 'next/image'
import Logo from '../assets/Logo.png'
import {UilShoppingBag, UilReceipt} from '@iconscout/react-unicons'
import { useStore } from "../store/store"
import Link from 'next/link'
import { useEffect, useState } from 'react'

// const items = useStore((state)=>state)
// console.log(state);

export default function Header () {
    const [Order, setOrder]= useState("")

    useEffect(()=>{
        setOrder (localStorage.getItem("order"));
    },[])
    const items = useStore((state)=>state.cart.pizzas.length)
    return(
        <div className={css.header}>
            {/* logo side */}
            <div className={css.logo}>
                <Image src ={Logo} alt ="" width={50} height={50}/>
                <span>Hot Pizza</span>
            </div>

            {/*Menu side */}
            <ul className={css.menu}>
                <li>
                   <Link href="../">Home</Link>
                </li>
                <li>Menu</li>
                <li>Contact</li>
            </ul>


            {/* right side */}
            <div className={css.rightSide}>
                <Link href='/cart'>
                <div className={css.cart}>
                    <UilShoppingBag size={35} color="#2E2E2E"/>
                    <div className={css.bags}>{items}</div>
                </div>
                </Link>


                {Order && (
                   <Link href={`/order/${Order}`}>
                    <div className={css.cart}>
                        <UilReceipt size={35} color = '#2e2e2e'/>
                        {Order != "" && <div className={css.badge}>1</div>}
                    </div>
                   </Link> 
                )}
            </div>
        </div>
    )
}

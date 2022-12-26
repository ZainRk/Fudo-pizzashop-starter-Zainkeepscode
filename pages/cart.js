import Image from "next/image"
import { useStore } from "../store/store"
import Layout from "../components/Layout"
import { urlFor } from "../lib/client"
import css from '../pages/Cart.module.css'
import toast, {Toaster} from "react-hot-toast"
import  {useState}  from "react"
import OrderModal from "../components/OrderModal"
import  {useRouter} from "next/router"


export default function Cart () {
    const cartData = useStore((state)=>state.cart)
    const removePizza = useStore((state)=>state.removePizza)
    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof Window !== 'undefined' && localStorage.getItem('order')
    )


    const handleRemove = (i)=>{
        removePizza(i);
        toast.error('Item Removed')
    }
    const router = useRouter()
    const total = ()=> cartData.pizzas.reduce((a,b)=>a+b.quantity * b.price, 0)

    const handleOnDelivery =()=> {
        setPaymentMethod(0);
    typeof Window !== 'undefined' && localStorage.setItem('total', total());

    }
    const handleCheckout = async()=>{
        typeof Window !== 'undefined' && localStorage.setItem('total', total())
        setPaymentMethod(1);
        const response = await fetch('/api/stripe',{
            method: "POST",
            headers:{
                'Content-type': "application/json",

            },
            body: JSON.stringify(cartData.pizzas),
        });

        if (response.status === 500) return ;

        const data = await response.json();
        toast.loading("Redirecting...");
        router.push(data.url)
    }
    return(
        <Layout>
            <div className = {css.container}>
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th></th>
                            
                        </thead>
                        <tbody className={css.tbody}>
                            {cartData.pizzas.length > 0 && cartData.pizzas.map((pizza, i)=>{
                                const src = urlFor(pizza.image).url()

                                return(
                                <tr key={i}>
                                    <td className = {css.imageTd}>
                                        <Image
                                        loader ={()=> src}
                                        src ={src}
                                         alt=""
                                         objectFit="cover"
                                         height={85}
                                         width={85}
                                         />
                                    </td>

                                        <td>
                                            {pizza.name}
                                        </td>  
                                        <td>
                                            {
                                                pizza.size === 0 ?
                                                "Small" :
                                                pizza.size ===1 ?
                                                "Medium" :
                                                "large"
                                            }
                                        </td>

                                        <td>
                                            {pizza.price}

                                        </td>
                                        <td>
                                            {pizza.quantity}
                                        </td>
                                        <td>
                                           {pizza.price * pizza.quantity} 
                                        </td>
                                        <td style={{color: "var(--themeRed)", cursor:'pointer'}}
                                        onClick={()=>handleRemove(i)}
                                        >x</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>

                {/* summery */}
                <div className={css.cart}>
                <span>Cart</span>
                <div className={css.CartDetails}>
                    <div>
                        <span>Items</span>
                        <span>{cartData.pizzas.length}</span>
                    </div>

                    <div>
                        <span>Total</span>
                        <span>${total()}</span>
                    </div>
                </div>

                    {!Order && cartData.pizzas.length > 0 ? (
                        <div className={css.buttons}>
                        <button className="btn" onClick={handleOnDelivery}>Pay on Delivery</button>
                        <button className="btn" onClick={handleCheckout}>Pay Now</button>
                    </div>
                    ) : null}
                
            </div>

            </div>
        <Toaster/>
        {/** model */}
        <OrderModal
        opened = {PaymentMethod === 0}
        setOpened = {setPaymentMethod}
        setPaymentMethod= {setPaymentMethod}
        />
        </Layout>
    )
}

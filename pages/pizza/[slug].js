import css from '../../styles/Pizza.module.css'
import Image from 'next/image';
import Layout from '../../components/Layout'
import { client, urlFor} from '../../lib/client'
import LeftArrow from '../../assets/arrowLeft.png'
import rightArrow from '../../assets/arrowRight.png'
import React, { useState } from 'react';
import { useStore } from "../../store/store";
import { toast, Toaster } from 'react-hot-toast';
 

export default function pizza({ pizza }) {
    const src = urlFor(pizza.image).url()


    const [Quantity, setQuantity] = useState(1)
    const [Size, setSize] = useState(1)

    // handle Quantity
     const handleQuan = (type)=> {
        type === "inc"
         ? setQuantity((prev) => prev + 1)
         : Quantity === 1 
         ? null 
         : setQuantity((prev) => prev - 1)
     }


     //Add to cart function

    const addPizza = useStore((state)=>state.addPizza)
     const addToCart = ()=> {
        addPizza({...pizza, price: pizza.price[Size],quantity: Quantity, size: Size})
        toast.success('Added to Cart')
     }
    
    return (<Layout>
        <div className={css.container}>
                    <div className={css.imageWrapper}>
                        <Image 
                        loader={()=> src}
                        alt=""
                        src={src} layout='fill'
                         unoptimized
                          objectFit='cover'
                          />
                    </div>
                
                {/**right side */}
         <div className={css.right}>
            <span>{pizza.name}</span>
            <span>{pizza.details}</span>

            <span><span style={{color:"var(--themeRed)"}}>$</span> {pizza.price[Size]}</span>
             <div className={css.size}>
                    <span>Size</span>
                    <div className={css.SizeVaraints}>
                        <div onClick={() => setSize(0)} className={Size === 0 ? css.selected :""}>Small</div>
                        <div onClick={() => setSize(1)} className={Size === 1 ? css.selected :""}> Medium </div>
                        <div onClick={() => setSize(2)} className={Size === 2 ? css.selected :""}>Large</div>
                    </div>
                </div>

                {/** quantity  counter */}
                <div className={css.quantity}>
                    <span>Quantity</span>

                    <div className={css.counter}>
                        <Image src={LeftArrow}
                        height={20}
                        width={20}
                        alt=""
                        objectFit='contain'
                        onClick={()=>handleQuan("dec")}
                        />

                        <span>{Quantity}</span>

                        <Image src={rightArrow}
                        height={20}
                        width={20}
                        alt=""
                        objectFit='contain'
                        onClick={()=>handleQuan("inc")}
                        />
                    </div>
                </div>
                <div className={`btn ${css.btn}`} onClick={addToCart}>
                    Add to Cart
                </div>
            </div>
            <Toaster/>
         </div>
            
    </Layout>
    );
}



export async function getStaticPaths(){
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    )
    return{
       paths: paths.map((slug)=>({params:{slug}})),
       fallback: 'blocking',
    }
}

export async function getStaticProps(context) {
   const {slug = ""} = context.params;
   const pizza = await client.fetch(
     `*[_type=="pizza" && slug.current == '${slug}'][0]`
   );
    return {
        props: {
            pizza,
        },
    };
}

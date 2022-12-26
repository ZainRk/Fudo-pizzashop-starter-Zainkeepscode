import Image from 'next/image'
import css from '../styles/Hero.module.css'
import cherry from '../assets/cherry.png'
import HeroImage from '../assets/HeroImage.png'
import {UilPhone} from '@iconscout/react-unicons'
import Pizzal from '../assets/p1.jpg'
export default function Hero () {
    return(
        <div className={css.container}>
            {/* left side */}
            <div className={css.left}>
              <div className={css.cherryDiv}>
                <span>More then Faster</span>
                <Image src= {cherry} alt="" width={40} height={25}/>
              </div>
           

            <div className={css.heroText}>
                <span>Be the Faster</span>
                <span>In Delevering</span>
                <span>

                    your <span style={{color: "var(--themeRed)"}}>pizza</span> 
                </span>
            </div>

            <span className={css.miniText}>
            "Anyone who says that money cannot buy happiness has clearly never spent their money on pizza."
            </span>

            <button className={`btn ${css.btn}`}>
                Get Started
            </button>

        </div>


             {/*right side */}

            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout='intrinsic'/>
                </div>


                <div className={css.ContactUs}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color='white'/>
                    </div>
                </div>


                <div className={css.Pizza}>
                    <div>
                        <Image src={Pizzal} alt=""objectFit='cover' layout='intrinsic'/>
                    </div>
                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span>
                            
                            <span style={{color: "var(--themeRed)"}}>$</span>10.50</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

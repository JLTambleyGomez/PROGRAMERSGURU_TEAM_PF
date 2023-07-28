import theme from "../../../theme/theme";


import s from "./About.module.css"
import Micaela from "../../../assets/img4/Micaela.png"
import Francisco from "../../../assets/img4/Francisco.png"
import Gianina from "../../../assets/img4/Gianina.png"
import Jorge from "../../../assets/img4/Jorge.png"
import Santiago from "../../../assets/img4/Santiago.png"
import Sol from "../../../assets/img4/Sol.png"
import Sebastian from "../../../assets/img4/Sebastian.png"


const About = () => {
    return (
        <main className={`${s.component} ${s[theme("component")]}`}>
            <div className={s.title}>
                <h1>
                    Conoce a nuestro equipo
                </h1>
            </div>

            <div className={s.content}>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.francisco}`}>
                        <img src={Francisco} alt="Image" />
                    </div>
                    <label>Francisco Passetti</label>
                </div>
                <div className={`${s.team} ${s.gianina}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Gianina Crespo</label>s */}
                        <img src={Gianina} alt="Image" />
                    </div>
                </div>
                <div className={`${s.team} ${s.jorge}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Jorge Tambley</label>s */}
                        <img src={Jorge} alt="Image" />
                    </div>
                </div>
                <div className={`${s.team} ${s.micaela}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Micaela Britez</label>s */}
                        <img src={Micaela} alt="Image" />
                    </div>
                </div>
                <div className={`${s.team} ${s.santiago}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Santiago Calderon</label>s */}
                        <img src={Santiago} alt="Image" />
                    </div>
                </div>
                <div className={`${s.team} ${s.sebastian}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Sebastian Menacho</label>s */}
                        <img src={Sebastian} alt="Image" />
                    </div>
                </div>
                <div className={`${s.team} ${s.sol}`}>
                    <div className={s.imageWrapper}>
                    {/* <label>Sol Benevent</label>s */}
                        <img src={Sol} alt="Image" />
                    </div>
                </div>
            </div>
                {/* <div className={s.card1}>
                    <div className={s.imageWrapper}>
                        <img src={Francisco} className={`${s.img} ${s.francisco}`}/>
                    </div>
                </div>
                <div className={s.team}>
                    <img src={Gianina} className={`${s.img} ${s.gianina}`}/>
                </div>
                <div className={s.team}>
                    <img src={Jorge} className={`${s.img} ${s.jorge}`}/>
                </div>
                <div className={s.team}>
                        <img src={Micaela} className={`${s.img} ${s.micaela}`}/>
                </div>
                <div className={s.team}>
                    <img src={Santiago} className={`${s.img} ${s.santiago}`}/>
                </div>
                <div className={s.team}>
                    <img src={Sebastian} className={`${s.img} ${s.sebastian}`}/>
                </div>
                <div className={s.team}>
                    <div className={s.card}>
                        <img src={Sol} className={`${s.img} ${s.sol}`}/>
                    </div>
                </div> */}
        </main>
    )
}

export default About;
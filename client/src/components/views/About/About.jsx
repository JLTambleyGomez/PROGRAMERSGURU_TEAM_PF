import theme from "../../../theme/theme";

import s from "./About.module.css"
import Micaela from "../../../assets/img4/Micaela.png"
import Francisco from "../../../assets/img4/Francisco.png"
import Gianina from "../../../assets/img4/Gianina.png"
import Jorge from "../../../assets/img4/Jorge.png"
import Santiago from "../../../assets/img4/Santiago.png"
import Sol from "../../../assets/img4/Sol.png"
import Sebastian from "../../../assets/img4/Sebastian.png"


//_________________________module_________________________
const About = () => {

    return (
        <main className={`${s.component} ${s[theme("component")]}`}>
            <div className={s.title}>
                <h1>
                    Conoce a nuestro equipo
                </h1>
            </div>

            <div className={s.test}>

            </div>

            <div className={s.content}>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.francisco}`}>
                        <img className={s.img2} src={Francisco} alt="Francisco Passetti" />
                    </div>
                    <label>Francisco Passetti</label>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.gianina}`}>
                        <img src={Gianina} alt="Gianina Crespo" />
                    </div>
                    <label>Gianina Crespo</label>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.jorge}`}>
                        <img src={Jorge} alt="Jorge Tambley" />
                    </div>
                    <label>Jorge Tambley</label>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.micaela}`}>
                        <img src={Micaela} alt="Micaela Britez" />
                    </div>
                    <label>Micaela Britez</label>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.santiago}`}>
                        <img src={Santiago} alt="Santiago Calderon" />
                    </div>
                    <label>Santiago Calderon</label>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.sebastian}`}>
                        <img src={Sebastian} alt="Sebastian Menacho" />
                    </div>
                    <div>Sebastian Menacho</div>
                </div>
                <div className={`${s.team}`}>
                    <div className={`${s.imageWrapper} ${s.sol}`}>
                        <img src={Sol} alt="Sol Benevent" />
                    </div>
                    <label>Sol Benevent</label>
                </div>
            </div>
        </main>
    )
}

export default About;
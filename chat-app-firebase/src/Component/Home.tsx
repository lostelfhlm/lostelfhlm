import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import styles from '../styles/Home.module.scss'
import { useNavigate } from 'react-router-dom'
import { HOME_NAVIGATION_DELAY_MS } from '../utils/constants'
import Logo from '../assets/logo/logo-no-background.png'
import Step1 from '../assets/HomePic/step1.png'
import Step2 from '../assets/HomePic/step2.jpg'
import Step3 from '../assets/HomePic/step3.jpg'
const Home: React.FC = () => {
  const navigate = useNavigate()
  const [isLeave, setIsLeave] = useState(false)
  // Css fade animation package
  useEffect(() => {
    AOS.init()
  }, [])

  const handleStart = () => {
    setIsLeave(true)
    setTimeout(() => {
      navigate('/login')
    }, HOME_NAVIGATION_DELAY_MS)
  }
  const handleAbout = () => {
    navigate('/about')
  }
  const handleContact = () => {
    navigate('/contact')
  }

  return (
    <div className={styles.home_container}>
      <div className={isLeave ? `${styles.home_box} ${styles.home_leave}` : styles.home_box}>
        <div className={styles.welcome_message}>
          <div className={styles.welcome_japanese}>
            <p className={styles.japanese_keyword}>「気が合う」</p>
            <p className={styles.japanese_main}>
              友達を探し、毎日をよりよく楽しくする。
            </p>
          </div>

          <div className={styles.welcome_english}>
            Meet friends who share the same hoobby and make your life more
            enjoyable.
          </div>
          <div className={styles.start} onClick={handleStart}>
            get start
          </div>
        </div>

        <div className={styles.home_step}>
          <div>
            <h2>step1,アカントを登録する</h2>
            <h3 className={styles.step1_message} data-aos="fade-right">
              profileでニックネーム、アイコン、自己紹介を設定し、自分の個性をアピールしよう。
            </h3>
          </div>

          <div>
            <h2>
              step2, みんなに一言メッセージを送る、話したい人をクリックする
            </h2>
            <h3 className={styles.step2_message} data-aos="fade-right">
              他の人のアイコンをクリックするとprofileが見られます、テキストをクリックするとメッセージを送ることは出来ます。
            </h3>
          </div>

          <div>
            <h2>
              step3,クリックすると自動に友達登録するから、個別チャットを楽しましょう
            </h2>
            <h3 className={styles.step3_message} data-aos="fade-right">
              友達登録したあと、テキストだけではなく、写真、絵文字も送ることが出来ます。
            </h3>
          </div>
        </div>

        <div className={styles.step_box}>
          <div className={styles.step} data-aos="fade-left">
            <img src={Step1}></img>
          </div>
          <div className={styles.step} data-aos="fade-left">
            <img src={Step2}></img>
          </div>
          <div className={styles.step} data-aos="fade-left">
            <img src={Step3}></img>
          </div>
        </div>

        <footer className={styles.footer}>
          <div>
            <img src={Logo} className={styles.logo}></img>
          </div>
          <div className={styles.About} onClick={handleAbout}>
            About
          </div>
          <div className={styles.Contact} onClick={handleContact}>
            contact me
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home

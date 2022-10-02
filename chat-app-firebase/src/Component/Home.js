import React, { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { useNavigate } from "react-router-dom"
import Logo from '../assets/logo/logo-no-background.png'
import Step1 from '../assets/HomePic/step1.png'
import Step2 from '../assets/HomePic/step2.jpg'
import Step3 from '../assets/HomePic/step3.jpg'
const Home = () => {
  const navigate = useNavigate()
  const [isLeave, setIsLeave] = useState(false)
  useEffect(() => {
    AOS.init()
  }, [])


  const handleStart = () => {

    setIsLeave(true)
    setTimeout(() => {
      navigate('/login')
    }, 500)

  }
  const handleAbout = () => {
    navigate('/about')
  }
  const handleContact = () => {
    navigate('/contact')
  }



  return (
    <div className="home_container">
      <div className={isLeave ? "home_box home_leave" : 'home_box'} >
        <div className="welcome_message">
          <div className="welcome_japanese">
            <p className="japanese_keyword">「気が合う」</p>
            <p className="japanese_main">
              友達を探し、毎日をよりよく楽しくする。
            </p>
          </div>

          <div className="welcome_english">
            Meet friends who share the same hoobby and make your life more enjoyable.
          </div>
          <div className="start" onClick={handleStart}>get start</div>
        </div>

        <div className="home_step">
          <div >
            <h2>step1,アカントを登録する</h2>
            <h3 className="step1_message" data-aos="fade-right">
              profileでニックネーム、アイコン、自己紹介を設定し、自分の個性をアピールしよう。
            </h3>
          </div>

          <div>
            <h2>step2, みんなに一言メッセージを送る、話したい人をクリックする</h2>
            <h3 className="step2_message" data-aos="fade-right">
              他の人のアイコンをクリックするとprofileが見られます、テキストをクリックするとメッセージを送ることは出来ます。
            </h3>
          </div>

          <div>
            <h2> step3,クリックすると自動に友達登録するから、個別チャットを楽しましょう</h2>
            <h3 className="step3_message" data-aos="fade-right">
              友達登録したあと、テキストだけではなく、写真、絵文字も送ることが出来ます。
            </h3>
          </div>
        </div>

        <div className="step_box">
          <div className="step" data-aos="fade-left">
            <img src={Step1}></img>
          </div>
          <div className="step" data-aos="fade-left">
            <img src={Step2}></img>
          </div>
          <div className="step" data-aos="fade-left">
            <img src={Step3}></img>
          </div>
        </div>

        <footer>
          <div >
            <img src={Logo} className="logo"></img>
          </div>
          <div className="About" onClick={handleAbout}>About</div>
          <div className="Contact" onClick={handleContact}>contact me</div>
        </footer>
      </div>
    </div>
  )
}

export default Home

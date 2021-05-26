import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import tickitz from '../../../assets/image/Tickitz 1.png'
import ebuid from '../../../assets/image/ebuid.png'
import cineone from '../../../assets/image/cineone21.png'
import hiflix from '../../../assets/image/hiflix.png'
import fbline from '../../../assets/image/fbline.png'
import igline from '../../../assets/image/igline.png'
import twitterline from '../../../assets/image/twitterline.png'
import youtubeline from '../../../assets/image/youtubeline.png'
import style from './footer.module.css'

function MyFooter() {
    return (
        <Container fluid style={{padding: '2em 0'}}>
            <Row style={{ padding: '0 2em' }} className={style['grid-2']}>
                <Col  className={style.sect}>
                    <img src={tickitz} alt="" />
                    <p>Stop waiting in line. Buy tickets conveniently, watch movies quietly</p>
                </Col>
                <Col className={style.sect}>
                    <h4>Explore</h4>
                    <p>Cinemas</p>
                    <p>Movies List</p>
                    <p>My Ticket</p>
                    <p>Notification</p>
                </Col>
                <Col className={style.sect}>
                    <h4>Our Sponsor</h4>
                    <img className={`${style.imgsponsor}`} src={ebuid} alt="ebuid" style={{ display: 'block' }} />
                    <img className={`${style.imgsponsor}`} src={cineone} alt="cineone" style={{ display: 'block' }} />
                    <img className={`${style.imgsponsor}`} src={hiflix} alt="hiflix" style={{ display: 'block' }} />
                </Col>
                <Col className={style.sect}>
                    <h4>Follow Us</h4>
                    <div className={`${style.disp}`}>
                        <img src={fbline} alt="" />
                        <p >Tickitz Cinema.id</p>
                    </div>
                    <div className={`${style.disp}`}>
                        <img src={igline} alt="" />
                        <p>tickitz.id</p>
                    </div>
                    <div className={`${style.disp}`}>
                        <img src={twitterline} alt="" />
                        <p>tickitz.id</p>
                    </div>
                    <div className={`${style.disp}`}>
                        <img src={youtubeline} alt="" />
                        <p>Tickitz Cinema.id</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default MyFooter

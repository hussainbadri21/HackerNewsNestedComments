import React from 'react';
import {G_URL} from "../../constants/constants";
import logo from "../../assets/logo.png";

const Navbar = ({name,img,changeUser}) => {
    return (
        <>
            <div id="main-navbar" className="navbar-container nav-hover f-d f-v-c f-h-sb">
                <div className="navbar-left-container f-d f-v-c">
                    <div
                        className="brand-logo c-pointer f-d f-v-c"
                        onClick={() => (window.location.href = G_URL)}
                    >
                        <img src= {logo} alt="logo"/>
                    </div>

                </div>
                <div className='navbar-right-container f-d'>
                    <div className='left-container'>
                        <div
                            className="user-img bg-image"
                            style={{
                                backgroundImage: `url(${img})`
                            }}/>
                    </div>
                    <div className='right-container'>
                            <div className='user-name'>{name}</div>
                        <div className='c-pointer change-user-btn' onClick={changeUser}>Change User</div>
                        </div>
                </div>
            </div>
            <style jsx={"true"}>
                {`
                    .navbar-container {
                        height: 64px;
                        background: #ffffff;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0);
                       position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: 1000;
                        transition: all 0.2s;  
                         padding-left: 5rem;
                         padding-right: 5rem;                
                    }

                    .navbar-container.nav-hover {
                        height: 82px;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                    }

                    .navbar-container .brand-logo > img {
                        height: 50px;
                        padding-right: 2rem;
                    }
                    
                    .navbar-container .vision-logo > img {
                         height: 50px;
                         margin-left: 2rem;
                    }

                    .navbar-right-container a {
                        text-decoration: none;
                        color: var(--carbon);
                    }
                    .right-container .change-user-btn{
                       text-decoration: underline;
                        opacity: 0.4;
                        color:var(--carbon);
                        font-size: 12px;
                    }
                    .right-container .change-user-btn:hover{
                        color:#ff6600;
                        opacity:1;
                    }
                     .navbar-right-container .left-container .user-img{
                         height:40px;
                         width:40px;
                         position: relative;
                         top: 0;
                         flex-shrink: 0;
                         border-radius: 50%;
                     }
                     .navbar-right-container .right-container{
                           margin-left: 1rem;
                     }
                         @media only screen and (max-device-width: 760px) {
                         .navbar-right-container{
                             margin-left: 1.5rem;
                        }
                        .quick-links-container > a{
                           margin-right: 0.5rem;
                        }
                         .navbar-container .brand-logo > img {
                             height: 36px;
                              padding-right: 1rem;
                    }
                    .navbar-container .vision-logo > img{
                             height: 36px;
                              margin-left: 1rem;
                    }
                     .navbar-container.nav-hover {
                        height: 82px;
                        box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                    }
                    }
              `}
            </style>

        </>
    );
}

export default Navbar;

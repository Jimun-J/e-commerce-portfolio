import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';

import './Banner.css';
import 'swiper/css';

import BannerOne from './BannerOne/BannerOne';
import BannerTwo from './BannerTwo/BannerTwo';

const Banner = () => {
    return (
        <div className="banner-container">
            <div className="banner">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={true}
                    pagination={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                    }}
                    speed={1200}
                    loop={true}
                    scrollbar={{ draggable: true }}
                    className="swiper"
                >
                    <SwiperSlide>
                        <BannerOne />
                    </SwiperSlide>
                    <SwiperSlide>
                        <BannerTwo />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Banner
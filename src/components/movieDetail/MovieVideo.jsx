import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y } from "swiper";

const MovieVideo = () => {
  const [item, setItem] = useState([]);
  const { category, id } = useParams();
  const api_key = "a4999a28333d1147dbac0d104526337a";
  useEffect(() => {
    const request = async () => {
      fetch(
        `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${api_key}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setItem(data.results);
        });
    };
    request();
  }, [category, id]);
  return (
    <>
      {item.length !== 0 ? (
        <Swiper
          modules={[A11y, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
        >
          {item.slice(0, 3).map((v, i) => (
            <SwiperSlide key={i}>
              <Video item={v} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="video">
          <p className="video__error">Sorry. No trailer</p>
        </div>
      )}
    </>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="video">
      <div className="video__title">{item.name}</div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title={item.name}
      ></iframe>
    </div>
  );
};

export default MovieVideo;

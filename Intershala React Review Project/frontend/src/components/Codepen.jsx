// const { useState, useEffect } = React;
import React, { useState, useEffect } from "react";
import {
  IoMdStar,
  IoMdStarHalf,
  IoMdStarOutline,
} from "https://cdn.skypack.dev/react-icons@4.1.0/io";
import { MdMoreHoriz } from "https://cdn.skypack.dev/react-icons@4.1.0/md";

const Tooltip = ({ children, tooltip }) => {
  return (
    <div className="group relative inline w-auto">
      {children}

      {tooltip ? (
        <span
          className="opacity-0 group-hover:opacity-100 invisible group-hover:visible bg-gray-100 px-4 py-1 rounded-md absolute -top-8 whitespace-nowrap shadow-md transition-opacity duration-200 ease-in-out text-gray-800 font-medium text-md z-10 w-auto"
          style={{ left: "5rem" }}
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

const colorSelector = (sentiment) => {
  switch (sentiment) {
    case "Positive":
      return "#D9F2DD";
    case "Negative":
      return "#F2DBD9";
    case "Mixed":
      return "#e8bd6d3d";
    case "Neutral":
      return "#eaf09b6b";
    default:
      return "";
  }
};

const options = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    data-name="Layer 1"
    id="Layer_1"
    className="w-4 h-4"
  >
    <title />
    <path d="M24.76,28.1A10.35,10.35,0,1,1,35.1,17.75,10.36,10.36,0,0,1,24.76,28.1Zm0-16.69a6.35,6.35,0,1,0,6.34,6.34A6.35,6.35,0,0,0,24.76,11.41Z" />
    <path d="M24.76,56.59a28.11,28.11,0,0,1-16.4-5.22,2,2,0,0,1-.83-1.43c0-.28,0-.54,0-.82a17.26,17.26,0,1,1,34.51,0,7.31,7.31,0,0,1,0,.81,2,2,0,0,1-.83,1.44c-.68.48-1.39.94-2.1,1.36a2,2,0,1,1-2-3.45c.33-.2.66-.4,1-.61a13.25,13.25,0,0,0-26.49,0,24.13,24.13,0,0,0,13.25,3.92,24.87,24.87,0,0,0,3.67-.27,2,2,0,0,1,.61,4A27.84,27.84,0,0,1,24.76,56.59Z" />
    <path d="M47.85,30.54a2,2,0,0,1-2-2V15.24a2,2,0,0,1,4,0v13.3A2,2,0,0,1,47.85,30.54Z" />
    <path d="M54.5,23.89H41.2a2,2,0,0,1,0-4H54.5a2,2,0,0,1,0,4Z" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    id="save"
    className="w-4 h-4"
  >
    <path
      fill="#F2F2F2"
      d="m24 24.956-7.386-5.745a.999.999 0 0 0-1.228-.001L8 24.956V8c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v16.956z"
    ></path>
    <path d="M23 5H9C7.346 5 6 6.346 6 8v19a1 1 0 0 0 1.614.789L16 21.267l8.386 6.522a.996.996 0 0 0 1.053.109A1 1 0 0 0 26 27V8c0-1.654-1.346-3-3-3zm1 19.956-7.386-5.745a.999.999 0 0 0-1.228-.001L8 24.956V8c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v16.956z"></path>
  </svg>,
  <MdMoreHoriz />,
];

const renderStars = (reviewScore, totalScore) => {
  const fullStars = Math.floor((reviewScore / totalScore) * 2.5);
  const hasHalfStar = ((reviewScore / totalScore) * 2.5) % 1 >= 0.5 ? 1 : 0;

  let stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoMdStar key={i} fill="#FCD303" size={20} />);
  }
  if (hasHalfStar) {
    stars.push(<IoMdStarHalf key={fullStars} fill="#FCD303" size={20} />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoMdStarOutline
        fill="rgba(17,24,39,0.3)"
        size={20}
        key={fullStars + i + 1}
      />
    );
  }

  return stars;
};

const renderHighlightedContent = (data) => {
  // console.log(data);
  let highlightedContent = [];
  var content = data.content;

  data.analytics.forEach((item, index) => {
    const [startIndex, endIndex, sentiment] = item.highlight_indices[0];
    const backgroundLabelColor = colorSelector(sentiment);
    const highlightedPhrase = content.substring(startIndex, endIndex + 1);

    highlightedContent.push(content.substring(0, startIndex));
    highlightedContent.push(
      <Tooltip tooltip={item.topic} key={index}>
        <span style={{ backgroundColor: backgroundLabelColor }}>
          {highlightedPhrase}
        </span>
      </Tooltip>
    );
    content = content.substring(endIndex + 1);
  });
  highlightedContent.push(content);

  return highlightedContent;
};

const data = [
  {
    review_id: "123456",
    reviewer_name: "Amgad",
    content:
      "Exceptional\n\nExceptional Pros: beautiful location, staff so friendly special host Mss Duksin, fishing trip is very nice we catch fish and cocked in same Resturant it was amazing , food is very delicious and fresh",
    raw_content:
      "Exceptional\n\nExceptional Pros: beautiful location, staff so friendly special host Mss Duksin, fishing trip is very nice we catch fish and cocked in same Resturant it was amazing , food is very delicious and fresh",
    date: "06 May 2022",
    rating_review_score: 10,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "en",
    source_hotel_code_: "",
    source_review_id: "838fa7fb77ff177d",
    category: "food and drinks",
    phrases: "fish|||fish",
    sentences:
      "Pros: beautiful location, staff so friendly special host Mss Duksin, fishing trip is very nice we catch fish and cocked in same Resturant it was amazing , food is very",
    topic: "food and drinks",
    sentiment: "Positive",
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [
      {
        category: "food and drinks",
        topic: "food and drinks",
        phrases: ["fish", "fish"],
        sentences: [
          "Pros: beautiful location, staff so friendly special host Mss Duksin, fishing trip is very nice we catch fish and cocked in same Resturant it was amazing , food is very",
        ],
        sentiment: "Positive",
        highlight_indices: [[25, 192, "Positive"]],
      },
    ],
    highlight_indices: [[25, 192, "Positive"]],
  },
  {
    review_id: "123459",
    reviewer_name: "Carole",
    content: "Wonderful\n\nWonderful",
    raw_content: "Wonderful\n\nWonderful",
    date: "17 Apr 2022",
    rating_review_score: 9,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "en",
    source_hotel_code_: "",
    source_review_id: "95f07a7dfceb595f",
    category: null,
    phrases: null,
    sentences: null,
    topic: null,
    sentiment: null,
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [],
  },
  {
    review_id: "1234512",
    reviewer_name: "Cristina",
    content:
      "The best service ever! Never found before a staff so professional and kind like in Fushifaru.\n\nThe best service ever! Never found before a staff so professional and kind like in Fushifaru.",
    raw_content:
      "The best service ever! Never found before a staff so professional and kind like in Fushifaru.\n\nThe best service ever! Never found before a staff so professional and kind like in Fushifaru.",
    date: "03 Apr 2022",
    rating_review_score: 10,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "en",
    source_hotel_code_: "",
    source_review_id: "ba53bd7f135b98aa",
    category: "service",
    phrases: "service|||service|||service|||service",
    sentences: "best service|||best service",
    topic: "service",
    sentiment: "Positive",
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [
      {
        category: "service",
        topic: "service",
        phrases: ["service", "service", "service", "service"],
        sentences: ["best service|||best service"],
        sentiment: "Positive",
        highlight_indices: [[-1, 26, "Positive"]],
      },
      {
        category: "staff",
        topic: "staff",
        phrases: ["staff", "staff", "staff", "staff"],
        sentences: [
          "found before a staff so professional and kind like in|||found before a staff so professional and kind like in",
        ],
        sentiment: "Positive",
        highlight_indices: [[-1, 108, "Positive"]],
      },
    ],
    highlight_indices: [[-1, 108, "Positive"]],
  },
  {
    review_id: "123457",
    reviewer_name: "Vladimir",
    content:
      "(Translated): don't go to Fushifara!!!! There are lots of other decent islands out there!!! (Original): не надо ехать на Фушифару!!!!  Есть много других приличных островов!!!\n\n(Translated): don't go to Fushifara!!!! There are lots of other decent islands out there!!! Cons: it's dirty, there are cockroaches in the villa of different sizes, it's full of Mosquitoes, neither the villa has ever been disinfected in 15 days. Very poor cleaning of the villa!!! The beach is very dirty: dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste and other rubbish! only 2 restaurants with a meager assortment, very few fruits, and no exotic ones at all: we will also eat bananas and apples in Moscow!!! (Original): не надо ехать на Фушифару!!!!  Есть много других приличных островов!!! Cons: грязно, тараканы в вилле разных размеров, полно Комаров, ни на территории не в вилле ни разу за 15 дней не проводились дезинфекционные мероприятия. очень плохая уборка виллы!!!  Пляж очень грязный: опасные куски проволоки от сетки рабицы, очень много бетонных кусков строительного мусора и прочего хлама!  всего 2 ресторана со скудным ассортиментом, очень мало фруктов, а экзотических нет вообще: бананы и яблоки мы и в Москве поедим!!!",
    raw_content:
      "не надо ехать на Фушифару!!!!  Есть много других приличных островов!!!\n\nне надо ехать на Фушифару!!!!  Есть много других приличных островов!!! Cons: грязно, тараканы в вилле разных размеров, полно Комаров, ни на территории не в вилле ни разу за 15 дней не проводились дезинфекционные мероприятия. очень плохая уборка виллы!!!  Пляж очень грязный: опасные куски проволоки от сетки рабицы, очень много бетонных кусков строительного мусора и прочего хлама!  всего 2 ресторана со скудным ассортиментом, очень мало фруктов, а экзотических нет вообще: бананы и яблоки мы и в Москве поедим!!!",
    date: "25 Jan 2022",
    rating_review_score: 2,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "ru",
    source_hotel_code_: "",
    source_review_id: "57ce91782d03c4e2",
    category: "beach",
    phrases: "beach|||beach",
    sentences:
      "beach is very dirty: dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste",
    topic: "beach",
    sentiment: "Negative",
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [
      {
        category: "beach",
        topic: "beach",
        phrases: ["beach", "beach"],
        sentences: [
          "beach is very dirty: dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste",
        ],
        sentiment: "Negative",
        highlight_indices: [[461, 578, "Negative"]],
      },
    ],
    highlight_indices: [[461, 578, "Negative"]],
  },
  {
    review_id: "123455",
    reviewer_name: "Andressa",
    content:
      "(Translated): Exceeded expectations! (Original): Superou as expectativas!\n\n(Translated): Exceeded expectations! Pros: The place is amazing in every way! Starting with service. The team, always present, calls us by name and, after the first contacts, they already know our preferences. Our island guide, Chelsea, besides being super pleasant and polite, was always available for a good conversation or to prepare any tour, dinner, or request we had. He and the whole team certainly made our season there something more than special! The island is super well located and allows for fantastic snorkeling. Marine life is rich and abundant, and we were able to be close to rays, sharks, fish of all colors, and Mantas! An incredible place to eat well, relax, and connect with nature. (Original): Superou as expectativas! Pros: O lugar é incrível em todos os aspectos! A começar pelo atendimento. A equipe, sempre presente, nos chama pelo nome e, após os primeiros contatos, já sabem de nossas preferências. Nosso guia da ilha, o Chelsea, além de super agradável e educado, estava sempre disponível para uma boa conversa ou para preparar qualquer passeio, jantar, ou pedido que tivéssemos. Ele e toda a equipe, com certeza, fizeram de nossa temporada lá algo mais que especial! A ilha é super bem localizada e permite fantásticos mergulhos de snorkel. A vida marinha é rica e abundante, e pudemos estar perto de arraias, tubarões, peixes de todas as cores e das Mantas! Um lugar incrível para comer bem, relaxar e conectar com a natureza.",
    raw_content:
      "Superou as expectativas!\n\nSuperou as expectativas! Pros: O lugar é incrível em todos os aspectos! A começar pelo atendimento. A equipe, sempre presente, nos chama pelo nome e, após os primeiros contatos, já sabem de nossas preferências. Nosso guia da ilha, o Chelsea, além de super agradável e educado, estava sempre disponível para uma boa conversa ou para preparar qualquer passeio, jantar, ou pedido que tivéssemos. Ele e toda a equipe, com certeza, fizeram de nossa temporada lá algo mais que especial! A ilha é super bem localizada e permite fantásticos mergulhos de snorkel. A vida marinha é rica e abundante, e pudemos estar perto de arraias, tubarões, peixes de todas as cores e das Mantas! Um lugar incrível para comer bem, relaxar e conectar com a natureza.",
    date: "25 Nov 2021",
    rating_review_score: 5,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "pt",
    source_hotel_code_: "",
    source_review_id: "9c8c51a0d0d97b7d",
    category: "staff",
    phrases: "team|||guide|||team|||team|||guide|||team",
    sentences:
      "team, always present, calls us by name and, after the first contacts, they already know our<_PHRASE_>island guide, Chelsea, besides being super pleasant and polite, was always available for a good conversation or to prepare any tour,<_PHRASE_>and the whole team certainly made our season there something more than",
    topic: "staff",
    sentiment: "Positive",
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [
      {
        category: "staff",
        topic: "staff",
        phrases: ["team", "guide", "team", "team", "guide", "team"],
        sentences: [
          "team, always present, calls us by name and, after the first contacts, they already know our",
          "island guide, Chelsea, besides being super pleasant and polite, was always available for a good conversation or to prepare any tour,",
          "and the whole team certainly made our season there something more than",
        ],
        sentiment: "Positive",
        highlight_indices: [
          [180, 271, "Positive"],
          [289, 421, "Positive"],
          [452, 522, "Positive"],
        ],
      },
      {
        category: "service",
        topic: "service",
        phrases: ["service", "service"],
        sentences: ["with service"],
        sentiment: "Positive",
        highlight_indices: [[162, 174, "Positive"]],
      },
      {
        category: "food and drinks",
        topic: "food and drinks",
        phrases: ["fish", "fish"],
        sentences: [
          "life is rich and abundant, and we were able to be close to rays, sharks, fish of all colors, and",
        ],
        sentiment: "Positive",
        highlight_indices: [[609, 705, "Positive"]],
      },
    ],
    highlight_indices: [[609, 705, "Positive"]],
  },
  {
    review_id: "1234511",
    reviewer_name: "Torsten",
    content:
      "Full recommendation. Incredible good.\n\nFull recommendation. Incredible good. Pros: The staff is incredible friendly and customer focused. Thank you, Chelsea, Tameel, Neelam, Thoha, Tami and all the others. It was a perfect stay with you. Cons: Nothing at all",
    raw_content:
      "Full recommendation. Incredible good.\n\nFull recommendation. Incredible good. Pros: The staff is incredible friendly and customer focused. Thank you, Chelsea, Tameel, Neelam, Thoha, Tami and all the others. It was a perfect stay with you. Cons: Nothing at all",
    date: "20 Nov 2021",
    rating_review_score: 7,
    hotel_code: "ZMVLHIFF",
    hotel_reply: "",
    source_language: "en",
    source_hotel_code_: "",
    source_review_id: "ba48331bbcd52f0a",
    category: "experience",
    phrases: "stay|||stay",
    sentences: "was a perfect stay with",
    topic: "experience",
    sentiment: "Positive",
    out_of: 5,
    review_url: "https://www.booking.com/hotel/mv/fushifaru-maldives.html",
    source: {
      code: "2",
      name: "booking.com",
      icon: "http://devinnspire.accessai.co:8001/media/sources/booking3.png",
      image:
        "http://devinnspire.accessai.co:8001/media/sources/booking_img.com.png",
    },
    bookmarked: false,
    bookmark_pk: 0,
    analytics: [
      {
        category: "experience",
        topic: "experience",
        phrases: ["stay", "stay"],
        sentences: ["was a perfect stay with"],
        sentiment: "Positive",
        highlight_indices: [[209, 232, "Positive"]],
      },
      {
        category: "staff",
        topic: "staff",
        phrases: ["staff", "staff"],
        sentences: ["The staff is incredible friendly and customer"],
        sentiment: "Positive",
        highlight_indices: [[83, 128, "Positive"]],
      },
    ],
    highlight_indices: [[83, 128, "Positive"]],
  },
];

const ReviewHighlighterCodepen = () => {
  return (
    <section className="min-h-screen w-full pt-12">
      {data.map((dataItem, index) => (
        <div
          key={index}
          className="h-auto w-auto xl:px-32 xl:py-6 lg:px-24 lg:py-6 md:px-16 md:py-4 sm:px-10 sm:py-4 px-6 py-4 flex"
        >
          <div className="inline justify-center items-start w-auto p-1 py-3 min-w-9">
            <img
              src={dataItem.source.icon}
              className="object-contain"
              height={28}
              width={28}
            />
          </div>

          <div className="inline h-auto p-1 px-2 w-full">
            <div className="flex justify-between items-center pt-1">
              <p className="max-[400px]:text-sm max-[350px]:text-xs text-base font-medium">
                <span className="text-gray-900 ps-1">
                  {dataItem.reviewer_name}
                </span>
                <span className="text-gray-400 px-1 inline-block text-nowrap">
                  wrote a review at
                </span>
                <span className="text-gray-900 ps-1">
                  {dataItem.source.name}
                </span>
              </p>

              <div className="inline-flex gap-0.5 max-sm:gap-0 justify-center items-center pe-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="max-[sm]:p-1 p-2 rounded-full hover:bg-gray-100 align-middle text-center focus:outline-none focus:ring-1 focus:bg-gray-100"
                    // onClick={}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-start items-center py-2 px-1">
              <div className="flex justify-start gap-1">
                {renderStars(dataItem.rating_review_score, dataItem.out_of).map(
                  (star, index) => (
                    <div key={index} className="mr-1">
                      {star}
                    </div>
                  )
                )}
              </div>

              <div className="text-xs font-medium leading-4 text-gray-400 align-middle px-3">
                {dataItem.date}
              </div>
            </div>

            <div className="text-sm font-medium text-gray-600">
              {renderHighlightedContent(dataItem)}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

// ReactDOM.render(<ReviewHighlighter />, document.getElementById("app"));
export default ReviewHighlighterCodepen;

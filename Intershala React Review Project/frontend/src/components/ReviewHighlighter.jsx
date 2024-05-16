import React from "react";
import data from "./reviews_data.json";
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { MdOutlinePersonAddAlt1, MdMoreHoriz } from "react-icons/md";
import Tooltip from "./Tooltip";

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

const renderHighlightedContent = (data) => {
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

const renderStars = (reviewScore) => {
  const fullStars = Math.floor(reviewScore / 2);
  const hasHalfStar = reviewScore % 2 !== 0;

  let stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoMdStar key={i} fill="#FCD303" size={20} />);
  }
  if (hasHalfStar) {
    stars.push(<IoMdStarHalf key={fullStars} size={20} fill="#FCD303" />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoMdStarOutline
        size={20}
        key={fullStars + i + 1}
        fill="rgba(17,24,39,0.3)"
      />
    );
  }

  return stars;
};

const options = [
  <MdOutlinePersonAddAlt1 />,
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

const ReviewHighlighter = () => {
  return (
    <>
      <section className="min-h-screen w-full pt-20">
        {data.map((dataItem, index) => (
          <div
            className="h-auto w-auto xl:px-32 xl:py-6 lg:px-24 lg:py-6 md:px-16 md:py-4 sm:px-10 sm:py-4 px-6 py-4 flex"
            key={index}
          >
            <div className="inline-flex shrink-0 justify-center items-start w-auto p-1 py-3">
              <img
                src={dataItem.source.icon}
                className="object-contain"
                height={28}
                width={28}
              />
            </div>

            <div className="inline-block h-auto p-1 px-2 w-full">
              <div className="flex justify-between items-center pt-1.5">
                <p className="text-base font-semibold">
                  <span className="text-gray-900  pe-1.5">
                    {dataItem.reviewer_name}
                  </span>
                  <span className="text-gray-900/50  pe-1.5">
                    wrote a review at
                  </span>
                  <span className="text-gray-900  pe-1.5">
                    {dataItem.source.name}
                  </span>
                </p>
                <div className="inline-flex gap-0.5 justify-center items-center pe-4">
                  {options.map((option, index) => (
                    <button
                      key={index}
                      className="p-2 rounded-full hover:bg-gray-100/80 align-middle text-center focus:outline-none focus:ring-1 focus:bg-gray-100/80"
                      // onClick={}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-start items-center py-2.5 px-1">
                <div className="flex justify-start gap-1">
                  {renderStars(dataItem.rating_review_score).map(
                    (star, index) => (
                      <div key={index} className="mr-1">
                        {star}
                      </div>
                    )
                  )}
                </div>
                <div className="text-xs font-semibold leading-4 text-gray-900/50 align-middle px-3">
                  {dataItem.date}
                </div>
              </div>

              <div className="text-sm font-semibold text-gray-900/70 font-montserrat">
                {renderHighlightedContent(dataItem)}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default ReviewHighlighter;

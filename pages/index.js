import React from "react";
export default function Home() {
  const data = [
    {
      id: 1,
      text: "first option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
    {
      id: 2,
      text: "second option",
    },
  ];
  return (
    <div>
      <div className="text-center font-bold text-2xl mt-10">
        Get started with CodeBlog
      </div>
      <div className="mx-12 relative flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 my-12">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-none bg-white rounded-lg shadow-md p-4 mr-4"
          >
            <h3 className="text-lg font-semibold mb-1">{item.text}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

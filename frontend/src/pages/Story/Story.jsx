import React from "react";
import StoryViewer from "../../components/Story/StoryViewer";

export default function Story() {
  const story = [
    {
      img: "https://images.pexels.com/photos/27915657/pexels-photo-27915657.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/18427946/pexels-photo-18427946.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/16373111/pexels-photo-16373111.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/17525263/pexels-photo-17525263.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/29101851/pexels-photo-29101851.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      img: "https://images.pexels.com/photos/28830104/pexels-photo-28830104.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];
  return (
    <div>
      <StoryViewer stories={story} />
    </div>
  );
}

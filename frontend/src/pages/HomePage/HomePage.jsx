import React from "react";
import StoryCircle from "../../components/Story/StoryCircle";
import HomeRight from "../../components/HomeRight/HomeRight";
import PostCard from "../../components/Post/PostCard";

export default function HomePage() {
  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center py-4 px-5">
        <div className="w-[35%] px-5">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full ">
            {[1, 1, 11].map((item) => (
              <StoryCircle />
            ))}
          </div>
          <div className="space-y-10 w-full mt-10">
            {[1, 1].map((item) => (
              <PostCard />
            ))}
          </div>
        </div>
        <div className="w-[25%] pl-20">
          <HomeRight />
        </div>
      </div>
    </div>
  );
}

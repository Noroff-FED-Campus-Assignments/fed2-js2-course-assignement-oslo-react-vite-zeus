import FetchPosts from "../components/fetchPosts";
import TempFetchPosts from "../components/tempFetchPosts";
import WritePosts from "../components/writePosts";

export default function Home() {
  return (
    <>
      {/* <TempFetchPosts /> */}
      <WritePosts />
      <FetchPosts />
    </>
  );
}

import FetchPosts from "../components/fetchPosts";
import WritePosts from "../components/writePosts";

export default function Home() {
  return (
    <>
      <WritePosts />
      <FetchPosts />
    </>
  );
}

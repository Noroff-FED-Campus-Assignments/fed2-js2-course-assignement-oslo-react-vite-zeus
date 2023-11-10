import Profile from "../components/profile-page";
import FetchPosts from "../components/fetchPosts";
import WritePosts from "../components/writePosts";
export default function ProfilePage() {
  return (
    <>
      <Profile />
      <WritePosts />
      <FetchPosts />
    </>
  );
}

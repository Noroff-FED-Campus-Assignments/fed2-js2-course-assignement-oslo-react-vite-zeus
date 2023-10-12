import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import { Link } from "@tanstack/react-router";

export default function TempFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dummyLogin = async () => {
      try {
        const raw = JSON.stringify({
          email: "first.last@stud.noroff.no",
          password: "UzI1NiIsInR5cCI",
        });
        const options = {
          method: "POST",
          body: raw,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
        const resp = await fetch(`${API_URL}/social/auth/login`, options);
        const data = await resp.json();
        localStorage.setItem("access_token", data.accessToken);

        const accessToken = localStorage.getItem("access_token");

        const url = new URL(`${API_URL}/social/posts`);
        console.log(url);
        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allPosts = await response.json();
        setPosts(allPosts);
        console.log(allPosts);

        // eslint-disable-next-line no-unused-vars
        const formattedDate = allPosts.map((post) => {
          const originalDateString = post.created;
          const date = new Date(originalDateString);

          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
          const day = date.getDate().toString().padStart(2, "0");
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          // eslint-disable-next-line no-unused-vars
          const dateFormated = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    dummyLogin();
  }, []);
  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;
  return (
    <>
      <div className="flex form-control w-full flex-col items-center justify-center mt-3 pt-3 mx-auto  max-w-3xl px-8">
        <div className="flex  gap-y-2 max-w-16 w-full gap-2 items-center ">
          <div
            role="profile-pic-container"
            className="flex flex-col items-center"
          >
            <img
              src=""
              className="label-text-alt object-cover w-24 h-24 rounded-full my-2"
            />
            <Link
              to="/Profile"
              className=" py-0.5 px-3 text-sm rounded-sm bg-blue-100"
            >
              Profile
            </Link>
          </div>
          <div className="flex flex-col w-full max-w-md items-end gap-y-2">
            <textarea
              name=""
              id=""
              cols="30"
              rows="2"
              placeholder="Whats on your mind?"
              className="input input-bordered w-full  p-2 border rounded-sm border-blue-300 focus:border-blue-500 focus:outline-blue-500"
            ></textarea>
            <button className="bg-blue-500 py-1 px-3 w-20 max-w-sm rounded-sm text-white">
              Post
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-lg">New posts</h2>
      <div className="w-full flex flex-col justify-center items-center">
        {posts.map(({ id, title, media, body, author, created }) => (
          <div
            role="post-container"
            className="flex flex-col w-3/4 m-4 max-w-7xl bg-slate-200 rounded-sm"
            key={id}
          >
            <div
              role="author"
              className="flex flex-wrap items-center gap-3 m-2"
            >
              <div className="w-10 h-10 rounded-full bg-slate-500 overflow-hidden">
                <img src={author.avatar} alt="" className="object-cover" />
              </div>
              <h2 className="text-gray-500">{author.name}</h2>
            </div>
            <div className="border-b border-blue-300"></div>
            <p className="text-gray-400">{created}</p>
            <div role="body" className="p-3">
              <p className="mb-3">{body}</p>
              <div className="flex flex-col justify-center items-center">
                <img className="w-48 rounded" src={media} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

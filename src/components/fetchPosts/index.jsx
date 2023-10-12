import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
// import { Link } from "@tanstack/react-router";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetPosts = async () => {
      try {
        const raw = {
          email: "first.last@stud.noroff.no",
          password: "UzI1NiIsInR5cCI",
        };
        const options = {
          method: "POST",
          body: JSON.stringify(raw),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
        const resp = await fetch(`${API_URL}/social/auth/login`, options);
        const data = await resp.json();
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("name", data.name);

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
    GetPosts();
    const updatePosts = async () => {
      try {

      }
    }
  }, []);
  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong! {error?.message}</h1>;
  return (
    <>
      <div className="bg-blue-50 py-12 sm:py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              New Posts
            </h2>
          </div>

          <div className="mx-auto mt-1 flex flex-col max-w-2xl  gap-x-8  py-3 sm:mt-1 lg:mx-0 lg:max-w-none ">
            {posts.map(({ title, id, author, body, created, media }) => (
              <article
                key={id}
                className="flex max-w-3xl flex-col border-t border-blue-500 items-start justify-between py-6"
              >
                <div className="text-sm leading-6">
                  <div className="relative flex items-center gap-x-3">
                    <img
                      src={author.avatar}
                      alt=""
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <p className="font-semibold cursor-pointer text-gray-900 hover:text-blue-500 ">
                      <a href={author.href}>
                        <span className="absolute inset-0" />
                        {author.name}
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-end gap-x-4 text-xs">
                    <time dateTime={created} className="text-gray-500">
                      {created}
                    </time>
                  </div>
                </div>
                <div className="group border-1 relative px-3 py-1">
                  <h2 className=" text-lg">{title}</h2>
                  <p className="mt-1 line-clamp-3 text-sm leading-6 text-gray-600">
                    {body}
                  </p>
                  <img className="rounded-sm" src={media} alt="" />
                </div>
                <button >Edit</button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

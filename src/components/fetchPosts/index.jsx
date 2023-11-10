import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import PostEditing from "../postEditing";
import { Link } from "@tanstack/react-router";
// import { Link } from "@tanstack/react-router";

export default function FetchPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const defaultAvatar = "/defaultprofilepic.png";

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

        url.searchParams.append("_author", "true");
        url.searchParams.append("_comments", "true");
        url.searchParams.append("_reactions", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allPosts = await response.json();

        const filteredPosts = allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchInput.toLowerCase());
        });

        setPosts(filteredPosts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    GetPosts();
  }, [searchInput]);

  const handleOnSearch = (srchInp) => {
    setSearchInput(srchInp);
  };

  if (isLoading)
    return (
      <div className="text-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <h1>Something went wrong! {error?.message}</h1>;

  return (
    <>
      <div className="py-12 bg-white sm:py-12">
        <div className="max-w-3xl px-6 mx-auto lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              New Posts
            </h2>
          </div>
          <input
            type="search"
            placeholder="Search"
            className="px-2 font-light bg-blue-100 border-2 border-blue-500 rounded-3xl"
            id="searchInput"
            onKeyUp={(event) => {
              handleOnSearch(event.target.value);
            }}
          />
          <div className="flex flex-col max-w-2xl py-3 mx-auto mt-1 gap-x-8 sm:mt-1 lg:mx-0 lg:max-w-none ">
            {posts.map(({ title, id, author, body, created, media }) => (
              <article
                key={id}
                className="flex flex-col items-start justify-between max-w-3xl py-6 border-t border-blue-500"
              >
                <div className="text-sm leading-6">
                  <div className="relative flex items-center gap-x-3">
                    {author.avatar ? (
                      <img
                        src={author.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full bg-gray-50"
                      />
                    ) : (
                      <img
                        src={defaultAvatar}
                        alt=""
                        className="w-10 h-10 rounded-full bg-gray-50"
                      />
                    )}

                    <p className="font-semibold text-gray-900 cursor-pointer hover:text-blue-500 ">
                      <a href={author.href}>
                        <span className="absolute inset-0" />
                        {author.name}
                      </a>
                    </p>
                  </div>

                  <div className="flex justify-end text-xs gap-x-4">
                    <time dateTime={created} className="text-gray-500">
                      {created}
                    </time>
                  </div>
                </div>
                <div className="relative px-3 py-1 group border-1">
                  <Link to={`/post/${id}?id=${id}`}>
                    <h2 className="text-lg ">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600 line-clamp-3">
                      {body}
                    </p>
                    <img className="rounded-sm" src={media} alt="" />
                  </Link>
                </div>
                <PostEditing id={id} />
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

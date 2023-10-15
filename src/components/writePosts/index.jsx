import { Link } from "@tanstack/react-router";
import { API_URL } from "../../lib/constants";
export default function writePosts() {
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const { title, body } = form.elements;
    const req = await fetch(`${API_URL}/social/posts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        title: title.value,
        body: body.value,
      }),
    });
    const data = await req.json();
    console.log(data);
  };
  return (
    <>
      <div className="flex form-control w-full flex-col items-center justify-center mt-3 pt-3 mx-auto  max-w-3xl px-8">
        <div className="flex  gap-y-2 max-w-16 w-full gap-2 items-center ">
          <div
            role="profile-pic-container"
            className="flex flex-col items-center"
          >
            <img
              src="src/assets/defaultprofilepic.png"
              className="label-text-alt object-cover w-24 h-24 rounded-full my-2"
            />
            <Link
              to="/Profile"
              className=" py-0.5 px-3 text-sm rounded-sm bg-blue-100"
            >
              Profile
            </Link>
          </div>
          <form
            onSubmit={submitHandler}
            className="flex flex-col w-full max-w-md items-end gap-y-2"
          >
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="input input-bordered w-full bg-blue-100 p-2 border rounded-sm border-blue-300 focus:border-blue-500 focus:outline-blue-500"
            />
            <textarea
              name="body"
              id="body"
              cols="30"
              rows="2"
              placeholder="Whats on your mind?"
              className="input input-bordered w-full bg-blue-100 p-2 border rounded-sm border-blue-300 focus:border-blue-500 focus:outline-blue-500"
            ></textarea>
            <input type="file" />
            <input
              name="media"
              id="media"
              className="bg-blue-500 py-1 px-3 w-20 max-w-sm rounded-sm text-white cursor-pointer"
              type="submit"
              value="Post"
            />
          </form>
        </div>
      </div>
    </>
  );
}

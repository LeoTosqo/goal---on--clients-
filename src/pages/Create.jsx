import React, { useState } from "react";
import step from "../assets/amico.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../axiosinstance";

const Create = () => {
  const redirect = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post("/", { title, description });
      if (data.success) {
        redirect("/all");
      }
      console.log(data);
    } catch (error) {
      toast.error("Title already exist");
      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-between align-items-center mt-3 pb-3 gap-lg-2">
      <div className="main-form py-5 px-1 ps-lg-2 ps-xl-3 pe-xl-3 rounded-2">
        <ToastContainer />
        <form onSubmit={handleCreateGoal} className="create-form">
          <div className="mt-2">
            <input
              type="text"
              placeholder="Goal Title"
              className="bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mt-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Goal Description"
              className="bg-transparent"
              required
            ></textarea>
          </div>
          <div className="mt-2">
            <button className="blue-bg p-2">
              {isSubmitting ? "creating goal..." : "create goal"}
            </button>
          </div>
        </form>
      </div>
      <div className="d-none d-lg-block main-img">
        <img src={step} alt="image of a step" />
      </div>
    </div>
  );
};

export default Create;

import React from "react";
import GoalHeader from "../components/GoalHeader";

import SingleGoal from "../components/SingleGoal";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";
import {useState,useEffect} from "react"
import { axiosInstance } from "../axiosinstance";




const Allgoals = () => {
  const[isloading, setIsLoading] =useState(true);
  const [goals, setGoals] = useState([]);

  const getGoals = async ()=>{
    const {data} = await axiosInstance("/");
    setIsLoading(false);
    setGoals(data.goals);

  };

  useEffect (()=>{
    getGoals();
  }, []);


  if (isloading) {
    return < Loading/>;
  }


if (!isloading && goals.length ===0){
  return <Empty/>;
}


  return (
    <div className="container pb-3">
      <GoalHeader heading="All Goals" />

      <div>
        <div>
          {goals &&
            goals.map((g) => {
              return <SingleGoal key={g._id} {...g} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Allgoals;

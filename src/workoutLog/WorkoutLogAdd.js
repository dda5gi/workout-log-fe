import React, {useState, useEffect} from "react";
import { Grid, Button, Container } from "@material-ui/core";
import WorkoutSelectTarget from "./WorkoutSelectTarget";
import WorkoutSelectName from "./WorkoutSelectName";
import WorkoutFillSet from "./WorkoutFillSet";

import { call } from "../service/ApiService";

const WorkoutLogAdd = (props) => {
    const [target, setTarget] = useState("");
    const [name, setName] = useState("");
    const [weights, setWeights] = useState(["0"]);
    const [reps, setReps] = useState(["0"]);
    const [targets] = useState(["가슴", "어깨", "등", "하체", "삼두", "이두", "복부", "전완", "엉덩이", "전신"])
    const [category, setCategory] = useState([]);

    useEffect(() => {
      if(localStorage.getItem("ACCESS_TOKEN") === "null") {
        window.location.href = "/login";
      }
      call("/workoutcategory", "GET", null).then((response) => {
        setCategory(response.data);
      })
    }, []);
    
    useEffect(() => {
      console.log("target:", target, "name:", name)
    }, [target, name]);

    const workoutLogSubmit = () => {
      var tempReps = reps.length.toString()
      var tempWeights = reps.length.toString()
      reps.forEach(element => {
        tempReps = tempReps + "," + element
      });
      weights.forEach(element => {
        tempWeights = tempWeights + "," + element
      })

      var items = {date: props.date, setOrder: props.setOrder+1, target: target, name: name, weights: tempWeights, reps: tempReps}

      call("/workoutlog", "POST", items).then((response) => {
        console.log(response)
        if(!response.error) {
          alert("등록 완료")
        }
        setTarget("")
        setName("")
        setWeights(["0"])
        setReps(["0"])
        props.setNextPage(false)
      });
    };

    const resetTarget = () => {
      setTarget("")
    }

    const resetName = () => {
      setWeights(["0"])
      setReps(["0"])
      setName("")
    }

    const setPlusClick = () => {
      setWeights(weights.concat(weights[weights.length-1]));
      setReps(reps.concat(reps[reps.length-1]));
    }

    const editReps = (idx, value) => {
      if(parseInt(value) < 0) {
        value = 0
      }
      var tempReps = reps.slice();
      tempReps[idx] = value
      setReps(tempReps)
    }

    const editWeights = (idx, value) => {
      if(parseInt(value) < 0) {
        value = 0
      }
      var tempWeights = weights.slice();
      tempWeights[idx] = value
      setWeights(tempWeights)
    }
    
    var workoutTargetList = (
      <div>
          {targets.map((targetItem, idx) => (
            <WorkoutSelectTarget key={idx} targetItem={targetItem} setTarget={setTarget}></WorkoutSelectTarget>
          ))}
          <br/>
          <Button fullWidth variant="contained" onClick={()=>props.setNextPage(false)}>
              뒤로 가기
          </Button>
      </div>
    );

    var workoutNameList = (
      <WorkoutSelectName target={target} category={category} setName={setName} resetTarget={resetTarget}></WorkoutSelectName>
    )

    var workoutSets = (
      <div>
        <br/>
        {reps.map((rep, idx) => (
          <WorkoutFillSet key={idx} rep={rep} weight={weights[idx]} idx={idx} editReps={editReps} editWeights={editWeights}></WorkoutFillSet>
        ))}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Button fullWidth variant="contained" onClick={setPlusClick}>
              세트 추가
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button fullWidth variant="contained" onClick={workoutLogSubmit}>
              등록
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button fullWidth variant="contained" onClick={resetName}>
              뒤로가기
            </Button>
          </Grid>
      </Grid>
      </div>
    )

    var content = workoutTargetList

    if(target && !name) {
      content = workoutNameList
    }
    if(target && name) {
      content = workoutSets
    }

    return (
      <Container maxWidth="md">
        {content}
      </Container>
    )
}

export default WorkoutLogAdd;
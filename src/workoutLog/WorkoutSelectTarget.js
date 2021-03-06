import React, { } from "react";
import { Typography, Card, CardActionArea, CardContent} from "@material-ui/core";

const WorkoutSelectTarget = (props) => {

  const onItemClick = (e) => {
    props.setTarget(e.target.innerText);
  };
  
  return (
    <div>
      <br/>
      <Card>
        <CardActionArea onClick={onItemClick}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">{props.targetItem}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default WorkoutSelectTarget;

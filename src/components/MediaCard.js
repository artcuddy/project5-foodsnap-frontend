import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";

export default function MediaControlCard(props) {
  const { id, title, likes_count, image } = props;

  return (
    <Card sx={{ display: "flex" }}>
      <Link to={`/posts/${id}`}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <Fab disabled size="small" color="black" aria-label="followers">
              <div>{likes_count}</div>
            </Fab>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image}
          alt={title}
        />
      </Link>
    </Card>
  );
}

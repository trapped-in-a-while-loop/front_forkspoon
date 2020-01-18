import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import VisibilityIcon from '@material-ui/icons/Visibility';

function Recipe(props) {

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

  function handleUpdateClick() {
    props.onUpdate(props.id);
  }

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '64.00%',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            I
          </Avatar>
        }
        action={
          <Link to={{pathname: `/recipe/${props.id}`}} >
            <IconButton aria-label="details">
              <VisibilityIcon />
            </IconButton>
          </Link>
        }
        title={props.title}
        subheader={
          new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(new Date(props.createdAt))
        }
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="edit" onClick={handleUpdateClick}>
          <EditIcon />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients :</Typography>
          <ul>
            {props.ingredients.map((ingredient, id) => 
              <li key={id}>{`${ingredient.name} (${ingredient.amount}${ingredient.unit})`}</li>
            )}
          </ul>
          <Typography paragraph>Instructions:</Typography>
          <ol>{props.instructions.map((instruction, id) => <li key={id}>{instruction}</li>)}</ol>
          <Typography>
            Global price : {props.price} $
          </Typography>
          <Typography>
            Time to cook : {props.duration} minutes
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}

export default Recipe;

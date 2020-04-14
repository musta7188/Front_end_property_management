import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
      },
  }));

export default function PropertyCard({property, newClasses, handleDeleteProperty, handlePropertyClick}) {
    console.log(property);
    const classes = useStyles();
    return (
        
        <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                    
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    action={
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteProperty(property.id)}>
                        <DeleteIcon aria-label="delete"/>
                        </IconButton>
                    </Tooltip>
                    }
                    title={property.address}
                    subheader="September 14, 2016"
                />
                <CardActionArea onClick={() => handlePropertyClick(property.id)}>
                <CardMedia
                    className={classes.media}
                    image="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?fit=scale"
                    title="NAME OF THE HOUSE HERE"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    house description
                    </Typography>
                </CardContent>
                </CardActionArea>
                </Card>
                
        </Grid>
        
      )
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

var navBarWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;



const useStyles = makeStyles({
  root: {
    width: navBarWidth,
  },
});


export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Recent Sitters" value="recents" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorite Sitters" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby Sitters" value="nearby" icon={<LocationOnIcon />} />
      <BottomNavigationAction label="Saved" value="folder" icon={<FolderIcon />} />
    </BottomNavigation>
  );
}
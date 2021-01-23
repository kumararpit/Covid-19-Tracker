import React from 'react'
import './infobox.css'
import { Card,CardContent ,Typography} from '@material-ui/core';
function Cases_tiles({title,cases,Total, ...props}) {
    return (
     
    <div className="card_info">
    <Card variant="outlined" onClick={props.onClick}>
     <CardContent>
     <Typography className="infobox_title"  color="textSecondary">
       {title}
     </Typography>
     <p className="infobox_cases" >{cases}</p>
     <Typography className="infobox_total"  color="textSecondary">
       {Total}
     </Typography>
     </CardContent>
    </Card>
    </div>
    )
}

export default Cases_tiles;

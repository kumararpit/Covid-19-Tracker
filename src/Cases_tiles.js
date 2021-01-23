import React from 'react'
import './infobox.css'
import { Card,CardContent ,Typography} from '@material-ui/core';
function Cases_tiles({title,cases,active,isred,isbrown,Total, ...props}) {
    return (
     
    <div className={`infobox ${active && 'infobox--selected'} ${isred && 'infobox--red'} ${isbrown && 'infobox--brown'}`}>
    <Card variant="outlined" onClick={props.onClick} style={{ border: "none" }}>
     <CardContent>
     <Typography className="infobox_title"  color="textSecondary">
       {title}
     </Typography>
     <p className={`infobox_cases ${(!isred && !isbrown) && 'infobox_cases--green'} ${isbrown && 'infobox_cases--brown'}`} >{cases}</p>
     <Typography className="infobox_total"  color="textSecondary">
       {Total}
     </Typography>
     </CardContent>
    </Card>
    </div>
    )
}

export default Cases_tiles;

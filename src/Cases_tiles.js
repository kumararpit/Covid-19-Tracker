import React from 'react'
import { Card,CardContent ,Typography} from '@material-ui/core';
function Cases_tiles({title,cases,Total}) {
    return (
    <div className="card_info">
    <Card variant="outlined">
     <CardContent>
     <Typography  color="textSecondary">
       {title}
     </Typography>
     <p>{cases}</p>
     <Typography color="textSecondary">
       {Total}
     </Typography>
     </CardContent>
    </Card>
    </div>
    )
}

export default Cases_tiles;

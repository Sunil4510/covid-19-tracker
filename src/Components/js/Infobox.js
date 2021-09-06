import React from 'react'
import "../css/Infobox.css"
import { Card,Typography,CardContent } from '@material-ui/core'
import { prettyPrintStat } from './utils'

const Infobox = ({title,isRed,active,cases,total,...props}) => {
    return (
        <Card onClick={props.onClick} className={`infobox ${active && 'infobox-selected'} ${isRed && 'infobox-red'}`}>
            <CardContent>
            {/*title coronavirus cases,recovery,deaths */}    
                <Typography color="textSecondary" className="infobox_title">
                    {title}
                </Typography>

           {/*Cases current  */}
                <h2 className={`infobox_cases ${!isRed && 'infobox-green'}`}>
                    {prettyPrintStat(cases)}
                </h2>

            {/*Total Cases */}
                <Typography className="infobox_total" color="textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox

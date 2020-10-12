import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface IIssue {
    title: string;
    created: string;
    body: string;
    labels: string[];
    user: string;
    number: number;
    url: string;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: "grey",
        color: "white"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Issue({ issue }: { issue: IIssue }) {
    const classes = useStyles();

    if (!issue) {
        return <div></div>;
    }

    var date = new Date(issue.created);
    var formatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    var created = date.toLocaleDateString('en-US', formatOptions).replace(',', '')
        .replace('PM', 'p.m.')
        .replace('AM', 'a.m.');

    var labelString = issue.labels.join(", ");
    return (
        <div>
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Issue #{issue.number} -- {created}
                </Typography>
                <Typography variant="h5" component="h2">
                    {issue.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {labelString}
                </Typography>
                {issue.body && <Typography variant="body2" component="p">
                    {issue.body}
                </Typography>}
            </CardContent>
            {issue.url &&
            <CardActions>
                <Button size="small" target="_blank" href={issue.url}>View PR</Button>
            </CardActions>}
        </Card>
        <br/>
        </div>
    );
}

export { Issue, IIssue }
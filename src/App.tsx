import * as React from 'react';
import { useState } from 'react';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import ApiCall from './ApiCall';
import { Issue, IIssue } from './Issue';

export default function App() {
  const url = "https://api.github.com/repos/walmartlabs/thorax/issues";
  const [isLoading, data, error] = ApiCall(url);

  const [page, setPage] = useState(1);
  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const [view, setView] = useState<IIssue>(null);
  const handleClick = (row: any) => {
    var url = row.pull_request ? row.pull_request.html_url : "";
    var labels = row.labels.map((label: any) => {
      if (!label) {
        return "";
      }

      if (typeof(label) == "object") {
        return label.name;
      }

      return label;
    })
    var issue:IIssue = {
      title: row.title,
      created: row.created_at,
      body: row.body,
      user: row.user.login,
      number: row.number,
      labels: labels,
      url: url,
    }
    setView(issue);
  }

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  const repos = error ? [] : data;
  var numPages = Math.floor(repos.length / 10);

  var start = (page - 1) * 10;
  var end = page * 10;
  return (
    <div>
      {error && <div>{error}</div>}
      {view && <Issue issue={view}/>}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>State</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repos.slice(start, end).map((row:any) => (
              <TableRow key={row.number} onClick={() => handleClick(row)}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Pagination count={numPages} page={page} onChange={handleChange} />
    </div>
  )
}
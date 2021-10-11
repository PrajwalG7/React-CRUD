import React from "react";

import {
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  Button,
  Paper,
  TableHead,
  TableRow,
  makeStyles,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
const View = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);

        setStudent(student.data);
      } catch (error) {
        console.log("Something went wrong!");
      }
    }
    getStudent();
  }, [id]);

  // Back Home
  function handleClick() {
    history.push("/");
  }
  return (
    <div>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Id
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.studname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Back To Home
        </Button>
      </Box>
    </div>
  );
};

export default View;

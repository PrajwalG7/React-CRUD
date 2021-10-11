import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TextField,
  Button,
  Paper,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import { deepPurple, green, orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
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
const Home = () => {
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState();
  const [studentsAdd, setStudentsAdd] = useState({
    studname: "",
    email: "",
  });
  function onTextFieldChange(e) {
    setStudentsAdd({
      ...studentsAdd,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3333/students", studentsAdd);
      setStatus(true);
    } catch (error) {
      console.log("Something went wrong!");
    }
  }

  // Fetch data using axios
  useEffect(() => {
    async function getAllStudent() {
      try {
        const students = await axios.get("http://localhost:3333/students");

        setStudents(students.data);
      } catch (error) {
        console.log("Something went wrong!");
      }
    }

    getAllStudent();
  }, []);

  const handleDelete = async (id) => {
    //to delete
    await axios.delete(`http://localhost:3333/students/${id}`);
    //to update
    var newStudent = students.filter((item) => {
      return item.id !== id;
    });
    setStudents(newStudent);
  };

  const classes = useStyles();

  //to load data into students when add is cliked
  if (status) {
    return <Home />;
  }
  return (
    <>
      {/* Add Student */}
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h4">React CRUD with API calls</Typography>
      </Box>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4"> Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="studname"
                  name="studname"
                  required
                  fullWidth
                  id="studname"
                  label="Name"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  id="email"
                  label="Email Address"
                  required
                  fullWidth
                  name="email"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        {/* Student List  */}
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.stuListColor}>
            <Typography variant="h4">Student List</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#616161" }}>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    No
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Name
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Email
                  </TableCell>
                  <TableCell align="center" className={classes.tableHeadCell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{i + 1}</TableCell>
                      <TableCell align="center">{student.studname}</TableCell>
                      <TableCell align="center">{student.email}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="view">
                          <IconButton>
                            <Link to={`/view/${student.id}`}>
                              <VisibilityIcon color="primary" />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <Link to={`/edit/${student.id}`}>
                              <EditIcon />
                            </Link>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton onClick={() => handleDelete(student.id)}>
                            <DeleteIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };
  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const [shouldUpdate, setShouldUpdate] = React.useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then(() => {
        console.log('New Student Added');
        setShouldUpdate(true); // Trigger the update
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  React.useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
        setShouldUpdate(false); // Reset the update flag
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [shouldUpdate]);

  return (
    <Container>
      <Paper elevation={2} style={paperStyle}>
        <h1 style={{ color: 'blue' }}>
          <u>Add Student</u>
        </h1>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="outlined" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>

      <h1>Students</h1>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            Id: {student.id} <br />
            Name: {student.name} <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

import "../styles/home.css";
import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { dataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

dayjs.extend(window.dayjs_plugin_customParseFormat);

const useStyles = makeStyles({
  selectBorder: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#bcbdc7",
    },
    "& .MuiInputLabel-root": {
      color: "#cecfd4",
    },
    "& .MuiOutlinedInput-root": {
      color: "#cecfd4",
    },
    "& .MuiIconButton-root": {
      color: "#cecfd4",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#e8e8e8",
    },
    "&:hover .MuiInputLabel-root": {
      color: "#e8e8e8",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e8e8e8",
    },
  },
});

export default function Home() {
  const navigate = useNavigate();
  let today = dayjs().format("YYYY-MM-DD");
  const [date, setDate] = useState(dayjs(today));
  const [openModal, setModal] = useState(false);
  const { newData } = useContext(dataContext);

  const handleChange = async (newDate) => {
    let formatDate = newDate.format("YYYY-MM-DD");
    setDate(formatDate);
    try {
      const request = await fetch(
        `${process.env?.REACT_APP_URL}api_key=${process.env?.REACT_APP_KEY}&date=${formatDate}&thumbs=true`
      );
      const json = await request.json();
      newData(json);
      navigate("/apod");
    } catch (error) {
      console.log(error);
    }
  };
  function getRandomDate() {
    const startDate = new Date("1995-06-16");
    const endDate = new Date();

    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    const randomDate = new Date(startDate.getTime() + randomTime);

    return randomDate.toISOString().split("T")[0];
  }

  const handleOnClick = async () => {
    try {
      const request = await fetch(
        `${process.env?.REACT_APP_URL}api_key=${
          process.env?.REACT_APP_KEY
        }&date=${getRandomDate()}&thumbs=true`
      );
      const json = await request.json();
      newData(json);
      navigate("/apod");
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

  const classes = useStyles();

  return (
    <div>
      <div className="container">
        <div className="divHelp">
          <Button variant="outlined" onClick={handleOpen}>
            <QuestionMarkIcon />
          </Button>
        </div>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          className="animation_left"
        >
          <DesktopDatePicker
            label="Select date"
            views={["day"]}
            inputFormat="DD/MM/YYYY"
            className={`${classes.selectBorder} animation_left buttonHome`}
            // value={date}
            onChange={handleChange}
            minDate="1995-06-16"
            maxDate={dayjs(today)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <hr className="animation_top" />
        <Button
          variant="outlined"
          className="animation_right buttonHome"
          onClick={handleOnClick}
        >
          Random
        </Button>
        {openModal === true && (
          <Modal
            openModal={openModal}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        )}
      </div>
    </div>
  );
}

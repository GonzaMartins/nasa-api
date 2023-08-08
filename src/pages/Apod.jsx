import Button from "@mui/material/Button";
import { dataContext } from "../context/dataContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Apod({}) {
  const { data } = useContext(dataContext);

  const navigate = useNavigate();

  const formatedDate = dayjs(data.date).format("DD-MM-YYYY");

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div className="apodContainer">
      <hr className="animation_top hrApod" />
      <div className="animation_top apodDataContainer">
        <div className="buttonBack animation_top">
          <Button variant="outlined" onClick={handleOnClick}>
            Back
          </Button>
        </div>
        <div>
          <div className="apodImageContainer animation_top">
            <div className="apodDataText copyright">{data.copyright}</div>
            <img src={data.url} className="apodImage" />
          </div>
          <div className="apodTextContainer animation_top">
            <div className="apodDataText textAlignCenter animation_top">
              <b>{formatedDate}</b>
            </div>
            <div className="apodDataText textAlignCenter animation_top">
              <b>{data.title}</b>
            </div>
            <div className="apodDataText description animation_top">
              {data.explanation}
            </div>
          </div>
        </div>
      </div>
      <hr className="animation_top hrApod" />
    </div>
  );
}

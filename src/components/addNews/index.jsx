import "./adminNews.css";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { MdCloudUpload } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminNews = () => {
  const [img, setImg] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const handleImg = (e) => {
    setImg(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", "blog-preset");

  const handleData = async (e) => {
    e.preventDefault();

    fetch("https://api.cloudinary.com/v1_1/dxealoh68/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        {
          fetch(import.meta.env.VITE_APP_BASE_URL + "/create_post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("admin")
            },
            body: JSON.stringify({
              img: data.url,
              title: title,
              text: text
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.message === "created post") {
               setTimeout(()=> {
                location.reload();
               },2500)
              }
              toast.info(data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((error) => console.log(error));
        }
      });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div className="admin-news">
       <ToastContainer />
      <div className="container">
        <div className="admin-news-inner">
          <h2 className="admin-news-title">Yangilik qo'shish</h2>
          <div className="admin-new-box">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
            >
              <div className="admin-news-wrapper">
                <TextField
                  id="outlined-required"
                  label="Mavzu"
                  autoComplete="current-lined"
                  variant="standard"
                  className="admin-news-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<MdCloudUpload />}
                  className="admin-news-input-btn"
                  onChange={(e) => handleImg(e)}
                >
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
              </div>
              <textarea
                name="text"
                cols="30"
                rows="10"
                placeholder="matn..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <button className="admin-news-add-btn" onClick={handleData}>qo'shish</button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

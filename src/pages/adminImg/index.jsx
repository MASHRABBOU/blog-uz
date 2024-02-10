import "./adminImg.css";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { MdCloudUpload } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { FaWindowClose } from "react-icons/fa";

export const AdminImg = () => {
  const [img, setImg] = useState(null);
  const [post, setPost] = useState([]);

    ///////////////// modal
    const [anchorSecond, setAnchorSecond] = useState(null);
  
    const handleClickSecond = (event) => {
      setAnchorSecond(anchorSecond ? null : event.currentTarget);
    };
  
    const openSecond = anchorSecond
    const ides = openSecond ? "simple-popper" : undefined;
  
    const grey = {
      200: "#DAE2ED",
      700: "#434D5B",
      900: "#1C2025",
    };
  
    const PopupBody = styled("div")(
      ({ theme }) => `
      width: 50vw;
      padding: 22px 36px;
      margin: 8px;
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
      background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      box-shadow: ${
        theme.palette.mode === "dark"
          ? `0px 4px 8px rgb(0 0 0 / 0.7)`
          : `0px 4px 8px rgb(0 0 0 / 0.1)`
      };
      font-size: 0.875rem;
      z-index: 1;
    `
    );
  
    /////////////////////// modal

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
          fetch(import.meta.env.VITE_APP_BASE_URL + "/create_img", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: sessionStorage.getItem("admin"),
            },
            body: JSON.stringify({
              img: data.url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.message === "created img") {
                location.reload();
              }
              alert(data?.message);
            })
            .catch((error) => console.log(error));
        }
      });
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_BASE_URL + `/img?page=1&limit=1000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPost(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const imgDelete = (e) => {
    fetch(import.meta.env.VITE_APP_BASE_URL + "/delete_img/" + e, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("admin"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "deleted img!") {
          location.reload();
        }
        alert(data.msg);
      })
      .catch((error) => console.log(error));
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
    <div className="admin-img">
      <div className="container">
        <div className="admin-img-inner">
          <h2 className="admin-img-title">Rasm qo'shish</h2>
          <div className="admin-img-box">
            <Button
              component="label"
              variant="contained"
              className="admin-img-add"
              startIcon={<MdCloudUpload />}
              onChange={(e) => handleImg(e)}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <button className="admin-img-add-btn" onClick={handleData}>
              qo'shish
            </button>
          </div>
        </div>
        <TableContainer component={Paper} className="admin-img-table">
          <h2 className="admin-img-title-bottom">Rasmlarni boshqarish</h2>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="admin-img-header" align="right">
                  Rasm
                </TableCell>
                <TableCell className="admin-home-header" align="right">
                  Yangilash
                </TableCell>
                <TableCell className="admin-img-header" align="right">
                  O'chirish
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {post.length &&
                post.map((item, idx) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={idx}
                    className="admin-contact-row"
                  >
                    <TableCell className="admin-img-body" align="right">
                      <img
                        src={item.img}
                        alt="img"
                        className="admin-img-photo"
                        width={50}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="admin-home-body" align="right">
                      <BasePopup
                        id={ides}
                        open={openSecond}
                        anchor={anchorSecond}
                        className="admin-home-add-box-bottom"
                      >
                        <PopupBody>
                          <Button
                            component="label"
                            variant="contained"
                            className="admin-home-add"
                            startIcon={<MdCloudUpload />}
                          >
                            Upload file
                            <VisuallyHiddenInput type="file" />
                          </Button>
                          <button className="admin-home-add-btn">
                            qo'shish
                          </button>
                          <FaWindowClose
                            className="admin-home-add-btn-close"
                            aria-describedby={ides}
                            onClick={handleClickSecond}
                          />
                        </PopupBody>
                      </BasePopup>
                      <FaEdit
                        className="admin-home-delete"
                        aria-describedby={ides}
                        onClick={handleClickSecond}
                      />
                    </TableCell>
                    <TableCell className="admin-img-body" align="right">
                      <RiDeleteBin6Fill
                        className="admin-img-delete"
                        onClick={() => imgDelete(item.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

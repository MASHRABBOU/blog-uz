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

export const AdminImg = () => {
  const [img, setImg] = useState(null);
  const [post, setPost] = useState([]);

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
                  >
                    <TableCell className="admin-img-body" align="right">
                      <img src={item.img} alt="img" className="admin-img-photo" width={50} height={50} />
                    </TableCell>
                    <TableCell className="admin-img-body" align="right">
                      <RiDeleteBin6Fill className="admin-img-delete" onClick={() => imgDelete(item.id)}/>
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

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./adminContact.css";
import { FaEdit } from "react-icons/fa";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import { FaWindowClose } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { MdCloudUpload } from "react-icons/md";

export const AdminContact = () => {
  const [contact, setContact] = useState([]);

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
  border: 1px solid ${theme === "dark" ? grey[700] : grey[200]};
  background-color: ${theme === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-size: 0.875rem;
  z-index: 1;
`
);

/////////////////////// modal

  useEffect(() => {
    fetch(import.meta.env.VITE_APP_BASE_URL + `/contact`)
      .then((res) => res.json())
      .then((data) => {
        setContact(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleDelete = (e) => {
    fetch(import.meta.env.VITE_APP_BASE_URL + "/delete_contact/" + e, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("admin"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "deleted contact!") {
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
    <div className="admin-contact">
      <div className="container">
        <div className="admin-contac-inner">
          <h2 className="admin-contact-title">Murojatlar</h2>
          <TableContainer component={Paper} className="admin-contact-table">
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="admin-contact-header">Ism</TableCell>
                  <TableCell className="admin-contact-header" align="right">
                    Email
                  </TableCell>
                  <TableCell className="admin-contact-header" align="right">
                    Mavzu
                  </TableCell>
                  <TableCell className="admin-contact-header" align="right">
                    Xabar
                  </TableCell>
                  <TableCell className="admin-contact-header" align="right">
                    Yangilash
                  </TableCell>
                  <TableCell className="admin-contact-header" align="right">
                    O'chirish
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contact.length &&
                  contact.map((item, idx) => (
                    <TableRow
                      className="admin-contact-row"
                      sx={{
                        "&:first-child td, &:first-child th": { border: 0 },
                      }}
                      key={idx}
                    >
                      <TableCell
                        className="admin-contact-body"
                        component="th"
                        scope="row"
                      >
                        {item.name}
                      </TableCell>
                      <TableCell className="admin-contact-body" align="right">
                        {item.email}
                      </TableCell>
                      <TableCell className="admin-contact-body" align="right">
                        {item.subject}
                      </TableCell>
                      <TableCell className="admin-contact-body" align="right">
                        {item.message}
                      </TableCell>
                      <TableCell className="admin-home-body" align="right">
                        <BasePopup
                          id={ides}
                          open={openSecond}
                          anchor={anchorSecond}
                          className="admin-home-add-box-bottom"
                        >
                          <PopupBody>
                            <div className="admin-news-wrapper">
                              <TextField
                                id="outlined-required"
                                label="ism"
                                autoComplete="current-lined"
                                variant="standard"
                                className="admin-news-input"
                              />
                            </div>
                            <div className="admin-news-wrapper">
                              <TextField
                                id="outlined-required"
                                label="email"
                                autoComplete="current-lined"
                                variant="standard"
                                className="admin-news-input"
                              />
                            </div>
                            <div className="admin-news-wrapper">
                              <TextField
                                id="outlined-required"
                                label="mavzu"
                                autoComplete="current-lined"
                                variant="standard"
                                className="admin-news-input"
                              />
                            </div>
                            <textarea
                              name="text"
                              cols="30"
                              rows="10"
                              placeholder="matn..."
                            ></textarea>
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
                      <TableCell className="admin-contact-body" align="right">
                        <RiDeleteBin6Fill
                          className="admin-contact-delete"
                          onClick={() => handleDelete(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

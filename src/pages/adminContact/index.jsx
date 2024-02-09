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

export const AdminContact = () => {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    fetch(
      import.meta.env.VITE_APP_BASE_URL + `/contact`
    )
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
        token: sessionStorage.getItem("admin")
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
  }

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
                      <TableCell className="admin-contact-body" align="right">
                        <FaEdit className="admin-contact-delete"/>
                      </TableCell>
                      <TableCell className="admin-contact-body" align="right">
                        <RiDeleteBin6Fill className="admin-contact-delete" onClick={() => handleDelete(item.id)}/>
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

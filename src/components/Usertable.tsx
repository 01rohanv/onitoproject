import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Usertable: React.FC = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dummyData = [
    {
      name: "",
      age: "",
      sex: "",
      mobile: "",
      govtIdType: "",
      govtId: "",
    },
  ];

  const fields = Object.keys(userData[0] || dummyData[0]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map((field, index) => (
                <TableCell key={index}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(userData.length ? userData : dummyData).map((data, dataIndex) => (
              <TableRow key={dataIndex}>
                {fields.map((field, fieldIndex) => (
                  <TableCell key={fieldIndex}>
                    {data[field] as string}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Usertable;

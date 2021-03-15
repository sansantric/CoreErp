import React from "react";
import Select from "react-select";
import "./index.css";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import DataTable from "react-data-table-component";
import CheckBox from "./checkBox";
import Button from "@material-ui/core/Button";

import Check from "@material-ui/icons/Check";
import Add from "@material-ui/icons/Add";
import Print from "@material-ui/icons/Print";
import Close from "@material-ui/icons/Close";
import MoreHoriz from "@material-ui/icons/MoreHoriz";
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,1)",
    "&:hover": { backgroundColor: "rgba(0,0,0,0)" },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    width: 300,
    // [theme.breakpoints.up('sm')]: {
    //   // marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
    boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    paddingLeft: 10,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3F63F5",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Index(props) {
  const classes = useStyles();
  const tahun = [
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2019", label: "2019" },
  ];
  const bulan = [
    { value: "01", label: "Januari" },
    { value: "02", label: "Februari" },
    { value: "03", label: "Maret" },
    { value: "04", label: "April" },
    { value: "05", label: "Mei" },
    { value: "06", label: "Juni" },
    { value: "07", label: "Juli" },
    { value: "08", label: "Agustus" },
    { value: "09", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];
  const tanggal = [];
  const getTanggl = () => {
    for (let index = 1; index < 32; index++) {
      tanggal.push({ value: index, label: index });
    }
    return tanggal;
  };
  const customSelectStyleTahun = {
    container: (base) => ({
      // none of react-select's styles are passed to <Control />
      ...base,
      minWidth: 90,
      boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
      borderRadius: 3,
      marginLeft: 10,
    }),
    control: (base) => ({
      ...base,
      borderRadius: 3,
      border: "0px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 2,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "blue",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      width: 0,
    }),
  };
  const customSelectStyleBulan = {
    container: (base) => ({
      // none of react-select's styles are passed to <Control />
      ...base,
      minWidth: 130,
      boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
      borderRadius: 3,
      marginLeft: 10,
    }),
    control: (base) => ({
      ...base,
      borderRadius: 3,
      border: "0px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 2,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "blue",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      width: 0,
    }),
  };
  const customSelectStyleTanggal = {
    container: (base) => ({
      // none of react-select's styles are passed to <Control />
      ...base,
      minWidth: 70,
      boxShadow: "0px 0px 5px rgba(0,0,0,.2)",
      borderRadius: 3,
      marginLeft: 10,
    }),
    control: (base) => ({
      ...base,
      borderRadius: 3,
      border: "0px",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 2,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "blue",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      width: 0,
    }),
  };

  const columns = [
    {
      name: "No.",
      selector: "No",
      center: true,
      sortable: true,
    },
    {
      name: "No. SR",
      selector: "NoSR",
      center: true,
      sortable: true,
    },
    {
      name: "Date",
      selector: "Date",
      center: true,
      sortable: true,
    },
    {
      name: "Keterangan",
      selector: "Keterangan",
      center: true,
      sortable: true,
    },
    {
      name: "Urgent",
      selector: "Urgent",
      center: true,
      sortable: true,
    },
    {
      name: "Ksg",
      selector: "Ksg",
      center: true,
      sortable: true,
    },
    {
      name: "Interco",
      selector: "Interco",
      center: true,
      sortable: true,
    },
    {
      name: "Submit",
      selector: "Submit",
      center: true,
      sortable: true,
    },
    {
      name: "PR",
      selector: "PR",
      center: true,
      sortable: true,
    },
    {
      name: "PO",
      selector: "PO",
      center: true,
      sortable: true,
    },
    {
      name: "GR",
      selector: "GR",
      center: true,
      sortable: true,
    },
    {
      name: "I/O",
      selector: "IO",
      center: true,
      sortable: true,
    },
    {
      name: "REJECT",
      selector: "REJECT",
      center: true,
      sortable: true,
    },
    {
      name: "ADD",
      selector: "ADD COLUMN"
    },
  ];
  const data = [];

  const genereateData = () => {
    for (let index = 1; index < 100; index++) {
      if (index % 3 == 1) {
        data.push({
          No: index,
          NoSR: `PAJI-K0${index}`,
          Date: `${index}/01/21`,
          Keterangan: `Keterangan ${index}`,
          Urgent: "",
          Ksg: "",
          Interco: <Check style={{ color: "#2975D9" }} />,
          Submit: <Check style={{ color: "#2975D9" }} />,
          PR: "",
          PO: "",
          GR: <Check style={{ color: "#2975D9" }} />,
          IO: <Check style={{ color: "#2975D9" }} />,
          REJECT: "",
        });
      } else {
        data.push({
          No: index,
          NoSR: `PAJI-K0${index}`,
          Date: `${index}/01/21`,
          Keterangan: `Keterangan ${index}`,
          Urgent: <Check style={{ color: "#2975D9" }} />,
          Ksg: "",
          Interco: "",
          Submit: "",
          PR: <Check style={{ color: "#2975D9" }} />,
          PO: "",
          GR: "",
          IO: "",
          REJECT: "",
        });
      }
    }

    return data;
  };

  const customeTableStyle = {
    header: {
      style: {
        minHeight: "50px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "0px",
        borderTopColor: "rgba(0,0,0,.2)",
        backgroundColor: "#2975D9",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: 12,
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderTopColor: "rgba(0,0,0,.2)",
        borderRightColor: "rgba(0,0,0,.2)",
        height: 40,
        color: "white",
      },
    },
    cells: {
      style: {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderTopColor: "rgba(0,0,0,.2)",
        borderRightColor: "rgba(0,0,0,.2)",
        fontSize: 12,
      },
    },
  };
  const customeRowBackColor = [
    {
      when: (row) => row.No < 6,
      style: {
        backgroundColor: "#D8F2F0",
        // color: 'white',
      },
    },
    {
      when: (row) => row.No >= 6,
      style: {
        backgroundColor: "#FBE0E2",
      },
    },
    {
      when: (row) => row.No >= 8,
      style: {
        backgroundColor: "#FFF0DC",
      },
    },
  ];
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: 20,
        maxHeight: "calc(100% - 70px)",
        minHeight: "calc(100% - 70px)",
        overflow: "auto",
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
      }}
    >
      <div className="menu1">
        <div style={{ alignSelf: "center" }}>
          <span style={{ fontWeight: "bold", fontSize: 17, color: "#1D3557" }}>
            {props.menu}
          </span>
        </div>
        <div className="subMenu1">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Select
            options={getTanggl()}
            defaultValue={{ label: 1, value: 1 }}
            // placeholder="Tanggal"
            styles={customSelectStyleTanggal}
          />
          <Select
            options={bulan}
            // placeholder="Bulan"
            defaultValue={bulan[0]}
            styles={customSelectStyleBulan}
            autosize={false}
          />
          <Select
            options={tahun}
            defaultValue={tahun[0]}
            // placeholder="Tahun"
            styles={customSelectStyleTahun}
          />
        </div>
      </div>
      <div className="divider" />

      <div className="menu2">
        <div className="subMenu2">
          <span className="thisMonth">This Month:</span>
          <span className="valueThisMonth">20</span>
        </div>
        <div className="subMenu2">
          <span className="onProgress">On Progress:</span>
          <span className="valueOnProgress">20</span>
        </div>
        <div className="subMenu2">
          <span className="approved">Approved:</span>
          <span className="valueApproved">20</span>
        </div>
      </div>

      <div className="divider" />

      <div className="mainContent">
        <DataTable
          columns={columns}
          data={genereateData()}
          selectableRows
          noContextMenu={true}
          noHeader={true}
          customStyles={customeTableStyle}
          conditionalRowStyles={customeRowBackColor}
          // selectableRowsComponent={CheckBox}
          // highlightOnHover
          selectableRowsHighlight
          pagination
          dense
        />
      </div>

      <div className="divider" />

      <div className="menuFooter">
        <Button
          className="menuFooterButton"
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "#3F63F5",
            color: "white",
            textTransform: "none",
          }}
          startIcon={<Add fontSize="large" />}
        >
          Add New
        </Button>
        <Button
          className="menuFooterButton"
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "#1D3557",
            color: "white",
            textTransform: "none",
          }}
          startIcon={<Print fontSize="large" />}
        >
          Print
        </Button>
        <Button
          className="menuFooterButton"
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "#F65A7A",
            color: "white",
            textTransform: "none",
          }}
          startIcon={<Close fontSize="large" />}
        >
          Cancel
        </Button>
        <Button
          className="menuFooterButton"
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "#00AF9E",
            color: "white",
            textTransform: "none",
          }}
          startIcon={<Check fontSize="large" />}
        >
          Closing
        </Button>
        <Button
          className="menuFooterButton"
          variant="contained"
          style={{
            borderRadius: 50,
            backgroundColor: "white",
            color: "grey",
            textTransform: "none",
            padding:8
          }}
          endIcon={<MoreHoriz fontSize="large" style={{color:'black'}} />}
        >
        </Button>
      </div>
    </div>
  );
}

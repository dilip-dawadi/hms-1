import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import SpammersDetail from "./detailSpam";
function Spammer({ spammer }) {
  // map spammers start form username z 
  const rows = spammer.map(r => {
    return {
      id: r._id,
      UserName: r.name,
      Email: r.email,
      Address: r.address,
      report: r.report,
      Status: r.report.length,
      Block: r._id,
    };
  });
  const columns = [
    {
      field: "UserName",
      headerName: "User Name",
      minWidth: 200,
      align: "center",
      sortable: true,
      filter: true,
      renderCell: params => (
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "Email",
      headerName: "Email",
      align: "center",
      width: 240,
      renderCell: params => (
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            margin: "auto",
            letterSpacing: "1px",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "Address",
      headerName: "Address",
      align: "center",
      minWidth: 150,
      maxWidth: 200,
      sortable: true,
      filter: true,
      renderCell: params => (
        <Typography variant="body2" color="textSecondary" component="p">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "report",
      headerName: "Report",
      align: "center",
      width: 120,
      renderCell: params => (
        <Button
          id="spammerReportBtn"
          style={{
            backgroundColor: "rgb(0, 67, 77)",
            textAlign: "center",
            color: "white",
            padding: "2px 8px",
            margin: "auto",
          }}
        >
          <SpammersDetail spammer={params.value} />
        </Button>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      align: "center",
      width: 120,
      renderCell: params => (
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            padding: "0px 12px",
          }}
        >
          {params.value === 2 ? "Active" : "Inactive"}
        </Typography>
      ),
    },
    {
      field: "Block",
      headerName: "Action",
      align: "center",
      width: 120,
      renderCell: params => (
        <Button
          color="secondary"
          variant="contained"
          style={{
            padding: "6px 12px",
          }}
        >
          Block
        </Button>
      ),
    },
  ];
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        style={{
          padding: "0px",
          margin: "auto",
          width: "90%",
          height: "100%",
        }}
        spacing={0}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            padding: "0px",
            margin: "0px",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              textAlign: 'Left',
              padding: '10px 0px 15px 10px',
              fontWeight: 'bold',
              fontSize: "2rem",
              letterSpacing: '2px',
              color: '#000',
              textTransform: 'uppercase',
            }}
          >
            Spam
          </div>
          <div
            style={{
              padding: "5px 5px 10px 5px",
              height: "100vh",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              rowHeight={90}
              headerHeight={60}
              pageSize={6}
              rowsPerPageOptions={[6, 12, 18, 50]}
              autoPageSize
              sx={{
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "black",
                  fontSize: 16,
                  letterSpacing: "1px",
                  fontWeight: "bold",
                  padding: "0px 20px",
                },
                "& .MuiDataGrid-virtualScrollerRenderZone": {
                  "& .MuiDataGrid-row": {
                    "&:nth-of-type(2n)": {
                      backgroundColor: "rgba(235, 235, 235, .7)",
                    },
                  },
                },
              }}
              style={{
                width: "100%",
                height: "100%",
                padding: "0px 10px",
                margin: "auto",
                borderRadius: "6px",
                backgroundColor: "white",
              }}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default Spammer;

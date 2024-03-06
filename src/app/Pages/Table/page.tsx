"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";

interface Review {
    name: string;
    review: string;
    rating: number;
}

const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 150,
    },
    {
        field: "review",
        headerName: "Review",
        width: 400,
    },
    {
        field: "rating",
        headerName: "Rating",
        width: 150,
    },
];

const useStyles = makeStyles({
    root: {
        height: 400,
        width: "100%",
    },
});

const Index: React.FC = () => {
    const [tableData, setTableData] = useState<Review[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios("https://api.example.com/reviews");
            setTableData(result.data);
        };
        fetchData();
    }, []);

    return (
        <div className={classes.root}>
            <h1>Rotten Pepper</h1>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </div>
    );
};

export default Index;

import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { AttachMoney, Money, Storefront } from "@material-ui/icons";
import SummaryCard from "../SummaryCard/SummaryCard";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    gap: theme.spacing(5),
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));

const Sumaryinfo = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalSold, setTotalSold] = useState(0);

  useEffect(() => {
    setLoading(true);
    const colRef = collection(db, "drugs");
    const unsub = onSnapshot(colRef, (snap) => {
      let documents = [];
      snap.forEach((doc) => documents.push({ ...doc.data() }));
      const value = documents
        .map((doc) => doc.totalValue)
        .reduce((acc, cur) => acc + cur, 0);
      const quantity = documents
        .map((doc) => +doc.quantity)
        .reduce((acc, cur) => acc + cur, 0);
      const sold = documents
        .map((doc) => +doc.price * doc.sold)
        .reduce((acc, cur) => acc + cur, 0);
      const items = documents.length;

      // setData;
      setTotalValue(value);
      setTotalQuantity(quantity);
      setTotalSold(sold);
      setTotalItems(items);
      setLoading(false);
    });

    return unsub;
  }, []);

  return (
    <>
      <Box className={classes.root} marginY={4}>
        <SummaryCard
          color="#ff9800"
          title="TOTAL ITEMS"
          value={loading ? "loading.." : totalItems}
          icon={<Storefront />}
        />

        <SummaryCard
          color="#123efc"
          title="TOTAL QUANTITY"
          value={`${totalQuantity} units`}
          icon={<Money />}
        />

        <SummaryCard
          color="#1e2e4c"
          title="TOTAL SOLD"
          value={`KES ${totalSold}`}
          icon={<Money />}
        />

        <SummaryCard
          last={true}
          color="#03a9f4"
          title="TOTAL VALUE"
          value={`KES ${totalValue}`}
          icon={<AttachMoney />}
        />
      </Box>
    </>
  );
};

export default Sumaryinfo;

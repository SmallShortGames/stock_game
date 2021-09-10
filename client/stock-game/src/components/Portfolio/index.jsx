import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Portfolio({
  data: { balance, positions, transactions },
}) {
  const positionMap = {
    _id: "company name",
    company_ticker: "symbol",
    avg_cost: "average cost",
    quantity: "quantity",
  };
  const positionHeadings = Object.keys(positionMap);
  const transactionMap = {
    buy_side: "side",
    company: "company",
    price: "price",
    quantity: "quantity",
  };
  const transactionHeadings = Object.keys(transactionMap);
  return (
    <>
      <Tabs>
        <Tab title="Positions" eventKey="positions">
          <Table>
            <thead>
              <tr>
                {positionHeadings.map((key) => {
                  return <th>{positionMap[key]}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                return (
                  <tr key={"posn" + JSON.stringify(position.created_at)}>
                    {positionHeadings.map((key) => {
                      return <td>{position[key]}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab title="Transactions" eventKey="transactions">
          <Table>
            <thead>
              <tr>
                {transactionHeadings.map((key) => {
                  return <th>{transactionMap[key]}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={"txn" + JSON.stringify(transaction.created_at)}>
                    {transactionHeadings.map((key) => {
                      if (key !== "buy_side") {
                        return <td>{transaction[key]}</td>;
                      } else {
                        return transaction[key] ? <td>buy</td> : <td>sell</td>;
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </>
  );
}

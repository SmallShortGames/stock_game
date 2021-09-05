import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

export default function Portfolio({
  data: { balance, positions, transactions },
}) {
  const positionHeadings = Object.keys(positions[0]);
  const transactionHeadings = Object.keys(transactions[0]);
  return (
    <>
      <Tabs>
        <Tab title="Positions" eventKey="positions">
          <Table>
            <thead>
              <tr>
                {positionHeadings.map((key) => {
                  return <th>{key}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {positions.map((position) => {
                return (
                  <tr>
                    {positionHeadings.map((key) => {
                      return <td>{JSON.stringify(position[key])}</td>;
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
                  return <th>{key}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr>
                    {transactionHeadings.map((key) => {
                      return <td>{JSON.stringify(transaction[key])}</td>;
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

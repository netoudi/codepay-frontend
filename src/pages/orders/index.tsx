import { GetServerSideProps, NextPage } from 'next';

import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColumns } from '@mui/x-data-grid';

import { http } from 'utils/http';
import { Order } from 'utils/models';

import theme from 'styles/theme';

export type NextPageProps = {
  orders: Order[];
};

const OrdersPage: NextPage = (props: NextPageProps) => {
  console.log(props.orders[0].id);
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: '# ID',
      width: 300,
    },
    {
      field: 'credit_card_name',
      headerName: 'CREDIT CARD NAME',
      width: 300,
    },
    {
      field: 'credit_card_number',
      headerName: 'CREDIT CARD NUMBER',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'VALUE',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'STATUS',
      width: 200,
    },
  ];

  return (
    <div>
      <Typography component="h1" variant="h4">
        My Orders
      </Typography>

      <Paper
        elevation={3}
        style={{ height: 500, width: '100%', marginTop: theme.spacing(4) }}
      >
        <DataGrid columns={columns} rows={props.orders} />
      </Paper>
    </div>
  );
};

export default OrdersPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await http.get('/orders', {
      headers: {
        'x-token': 'r78u1lj3g7n',
      },
    });

    return {
      props: {
        orders: data,
      },
    };
  } catch (e) {
    return {
      props: {
        orders: [],
      },
    };
  }
};

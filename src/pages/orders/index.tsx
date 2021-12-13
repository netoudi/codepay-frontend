import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Router from 'next/router';

import { Link as MuiLink, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { withIronSessionSsr } from 'iron-session/next';
import useSWR from 'swr';

import { fetcher, httpNext } from 'utils/http';
import ironConfig from 'utils/iron-config';
import { Order } from 'utils/models';

import theme from 'styles/theme';

export type NextPageProps = {
  orders: Order[];
};

const OrdersPage = (props: NextPageProps) => {
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: '# ID',
      width: 300,
      renderCell: (params) => {
        return (
          <Link href={`/orders/${params.value}`} passHref>
            <MuiLink>{params.value}</MuiLink>
          </Link>
        );
      },
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

  const { data } = useSWR('/orders', fetcher, {
    fallbackData: props.orders,
    refreshInterval: 5 * 1000, // 5 secounds
    onError: (error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        Router.push('/login');
      }
    },
  });

  return (
    <div>
      <Typography component="h1" variant="h4">
        My Orders
      </Typography>

      <Paper
        elevation={3}
        style={{ height: 500, width: '100%', marginTop: theme.spacing(4) }}
      >
        <DataGrid columns={columns} rows={data} />
      </Paper>
    </div>
  );
};

export default OrdersPage;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context) => {
    const account = context.req.session.account;

    if (!account) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    try {
      const { data } = await httpNext.get('/orders', {
        headers: {
          cookie: context.req.headers.cookie as string,
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
  },
  ironConfig
);

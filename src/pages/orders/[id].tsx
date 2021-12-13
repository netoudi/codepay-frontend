import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from '@mui/material';
import useSWR from 'swr';

import { fetcher } from 'utils/http';

import theme from 'styles/theme';

const OrderDetailsPage: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.id;

  const { data, error } = useSWR(`/orders/${orderId}`, fetcher, {
    onError: (error) => {
      console.log(error);
      if (error.response.status === 401 || error.response.status === 403) {
        Router.push('/login');
      }
    },
  });

  console.log({ orderId, data, error });

  if (!data) return null;

  return (
    <div>
      <Typography component="h1" variant="h4">
        Order Details
      </Typography>

      <div style={{ height: 400, width: '100%', marginTop: theme.spacing(4) }}>
        <Grid container>
          <Grid item>
            <Card>
              <CardHeader
                title="Order"
                subheader={data.id}
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{
                  align: 'center',
                }}
                sx={{
                  backgroundColor: (theme) => theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'baseline',
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    R$ {data.amount}
                  </Typography>
                </Box>
                <ul style={{ listStyle: 'none' }}>
                  <Typography component="li" variant="subtitle1">
                    {data.credit_card_number}
                  </Typography>
                  <Typography component="li" variant="subtitle1">
                    {data.credit_card_name}
                  </Typography>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OrderDetailsPage;

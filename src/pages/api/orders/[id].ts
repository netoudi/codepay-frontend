import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import { withIronSessionApiRoute } from 'iron-session/next';

import { httpNest } from 'utils/http';
import ironConfig from 'utils/iron-config';

export default withIronSessionApiRoute(orderDetails, ironConfig);

async function orderDetails(req: NextApiRequest, res: NextApiResponse) {
  const account = req.session.account;

  if (!account) {
    return res.status(401).json({ message: 'Unauthenticated' });
  }

  const { id } = req.query;

  try {
    const { data } = await httpNest.get(`/orders/${id}`, {
      headers: {
        'x-token': account.token,
      },
    });
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    if (axios.isAxiosError(e)) {
      return res.status(e.response!.status).json(e.response?.data);
    }
    return res.status(500).json({ message: 'Ocorreu um erro interno' });
  }
}

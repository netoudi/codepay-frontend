import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import { httpNest } from 'utils/http';
import ironConfig from 'utils/iron-config';

export default withIronSessionApiRoute(login, ironConfig);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  console.log({ token });

  try {
    const { data } = await httpNest.get(`/accounts/${token}`);
    req.session.account = data;
    await req.session.save();
    return res.status(200).json(data);
  } catch (e) {
    // console.log(e);
    return res.status(401).json({ message: 'Unauthenticated' });
  }
}

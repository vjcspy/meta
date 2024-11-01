import { initializeSlack, postMessage } from '@util/slack';
import {
  SLACK_MISSING_CONFIGURATION_ERROR,
  SLACK_MISSING_POST_MESSAGE_SECRET_ERROR,
  SLACK_UNAUTHORIZED_POST_MESSAGE_ERROR,
  UNKNOWN_ERROR,
} from '@values/error-type';
import type { Request, Response } from 'express';

export const slackPostMessageController = async (
  req: Request,
  res: Response,
) => {
  console.log('slackPostMessageController');
  if (!initializeSlack()) {
    return res.status(400).json({ error: SLACK_MISSING_CONFIGURATION_ERROR });
  }

  const postMessageSecret = process.env.SLACK_POST_MESSAGE_SECRET;

  if (!postMessageSecret) {
    return res
      .status(400)
      .json({ error: SLACK_MISSING_POST_MESSAGE_SECRET_ERROR });
  }

  const { token, payload } = req.body;
  console.log('token', token, 'payload', payload);

  if (token !== postMessageSecret) {
    return res
      .status(401)
      .json({ error: SLACK_UNAUTHORIZED_POST_MESSAGE_ERROR });
  }

  try {
    await postMessage(payload);
  } catch (e) {
    return res
      .status(400)
      .json({ error: e instanceof Error ? e.message : UNKNOWN_ERROR });
  }

  return res.json({
    msg: 'ok',
  });
};

import { message as antMessage } from 'antd';
class Message {
  success(config: { content: any }) {
    antMessage.open({
      type: 'success',
      content: config.content,
    });
  }

  error(config: { content: any }) {
    antMessage.open({
      type: 'error',
      content: config.content,
    });
  }
}
const i = new Message();

export const message = () => i;

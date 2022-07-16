import { message } from "antd";

//error, warning, info, success
//content
function AlertModal({ type = "success", duration = 3, ...props }) {
  return message[type]({
    duration: duration,
    ...props,
  });
}

export default AlertModal;

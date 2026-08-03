import { cloneElement } from "react";
import useAuth from "../../hooks/useAuth";

function ProtectedAction({
  children,
  action,
}) {

  const { requireAuth } = useAuth();

  const handleClick = (e) => {

    e.preventDefault();

    requireAuth(() => {

      action();

    });

  };

  return cloneElement(children, {
    onClick: handleClick,
  });

}

export default ProtectedAction;
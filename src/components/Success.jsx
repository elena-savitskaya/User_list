import React from 'react';
import success from "../assets/success.svg";

export const Success = ({ count }) => {
  return (
    <div class="success-block">
      <img src={success} alt="Success" />
      <h3>Успішно!</h3>
      <p>Усім {count} користувачам надіслано запрошення.</p>
      <button onClick={() => window.location.reload()} className="send-invite-btn">Назад</button>
    </div>
  );
};

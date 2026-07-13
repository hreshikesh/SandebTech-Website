const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const existingUsers = [
  {
    id: 1,
    email: "rishi@gmail.com",
    name: "Rishi",
    phone: "+919999999999",
    company: "SandebTech",
  },
];

export async function sendOTP(email) {
  await delay(1200);

  return {
    success: true,
    message: "OTP Sent",
  };
}

export async function verifyOTP(email, otp) {
  await delay(1500);

  if (otp !== "123456") {
    return {
      success: false,
      message: "Invalid OTP",
    };
  }

  const user = existingUsers.find(
    (u) => u.email === email
  );

  if (user) {
    return {
      success: true,
      existingUser: true,
      user,
    };
  }

  return {
    success: true,
    existingUser: false,
  };
}

export async function register(data) {
  await delay(1500);

  const user = {
    id: Date.now(),
    ...data,
  };

  existingUsers.push(user);

  return {
    success: true,
    user,
  };
}
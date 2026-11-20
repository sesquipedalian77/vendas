exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { pin } = JSON.parse(event.body || "{}");
    const secretPin = process.env.ADMIN_PIN;

    if (!secretPin) {
      return {
        statusCode: 500,
        body: JSON.stringify({ ok: false, error: "Server PIN not configured" })
      };
    }

    const isValid = String(pin).trim() === String(secretPin).trim();
    return {
      statusCode: isValid ? 200 : 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: isValid })
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false })
    };
  }
};

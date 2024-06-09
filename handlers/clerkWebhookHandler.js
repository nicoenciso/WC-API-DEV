import { Webhook } from "svix";
import dotenv from "dotenv";
import { createUser, updateUser, deleteUser } from "./users.js";

dotenv.config();

export const clerkWebhookHandler = async (payload, headers) => {
  // Verifica el webhook
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
  const evt = wh.verify(payload, headers);

  // Extrae los datos del payload
  const { id, ...attributes } = evt.data;

  // Extrae el tipo de evento
  const eventType = evt.type;

  // Crea un usuario en la base de datos
  if (eventType === "user.created") {
    const emailObj = attributes?.email_addresses[0];
    createUser({
      id,
      username: attributes?.username,
      email: emailObj?.email_address,
      first_name: attributes?.first_name,
      last_name: attributes?.last_name,
      image_url: attributes?.image_url,
    });
  }

  // Actualiza un usuario en la base de datos
  if (eventType === "user.updated") {
    updateUser(id, {
      username: attributes?.username,
      first_name: attributes?.first_name,
      last_name: attributes?.last_name,
      image_url: attributes?.image_url,
    });
  }

  // Elimina un usuario en la base de datos
  if (eventType === "user.deleted") {
    deleteUser(id);
  }
};

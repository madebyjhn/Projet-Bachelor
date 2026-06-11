import { getDb } from "./mongodb";

export type ActivityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "REGISTER"
  | "TRANSACTION_CREATED"
  | "TRANSACTION_DELETED"
  | "TRANSACTION_UPDATED"
  | "PROJECT_CREATED"
  | "PROJECT_DELETED"
  | "PROJECT_UPDATED";

export interface ActivityLog {
  id_user: number | null;
  action: ActivityAction;
  entity: string;
  details: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Enregistre un événement dans MongoDB sans bloquer la réponse HTTP.
 * Les erreurs sont silencieuses pour ne pas impacter l'utilisateur.
 */
export async function logActivity(
  id_user: number | null,
  action: ActivityAction,
  entity: string,
  details: Record<string, unknown> = {},
): Promise<void> {
  try {
    const db = await getDb();
    const doc: ActivityLog = {
      id_user,
      action,
      entity,
      details,
      timestamp: new Date(),
    };
    await db.collection<ActivityLog>("activity_logs").insertOne(doc);
  } catch (err) {
    console.error("ACTIVITY_LOG_ERROR:", err);
  }
}

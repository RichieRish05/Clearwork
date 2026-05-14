import {
  boolean,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");


export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email"),
  createdAt: timestamp("created_at", { withTimezone: true }),
  lastSignInAt: timestamp("last_sign_in_at", { withTimezone: true }),
});

export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export const stripeConnections = pgTable("stripe_connections", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  stripeAccountId: text("stripe_account_id").notNull().unique(),
  scope: text("scope").notNull(),
  livemode: boolean("livemode").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  publishableKey: text("publishable_key"),
  tokenType: text("token_type"),
  connectedAt: timestamp("connected_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const stripeProducts = pgTable(
  "stripe_products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    stripeProductId: text("stripe_product_id").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    active: boolean("active").notNull().default(true),
    metadata: jsonb("metadata").$type<Record<string, string>>().default({}).notNull(),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("stripe_products_user_stripe_id_uniq").on(t.userId, t.stripeProductId),
  ],
);

export const stripePrices = pgTable(
  "stripe_prices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => stripeProducts.id, { onDelete: "cascade" }),
    stripePriceId: text("stripe_price_id").notNull(),
    unitAmount: integer("unit_amount"),
    currency: text("currency").notNull(),
    type: text("type").notNull(),
    recurringInterval: text("recurring_interval"),
    recurringIntervalCount: integer("recurring_interval_count"),
    trialPeriodDays: integer("trial_period_days"),
    active: boolean("active").notNull().default(true),
    metadata: jsonb("metadata").$type<Record<string, string>>().default({}).notNull(),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }).defaultNow().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("stripe_prices_user_stripe_id_uniq").on(t.userId, t.stripePriceId),
  ],
);

export type StripeConnection = typeof stripeConnections.$inferSelect;
export type NewStripeConnection = typeof stripeConnections.$inferInsert;
export type StripeProduct = typeof stripeProducts.$inferSelect;
export type NewStripeProduct = typeof stripeProducts.$inferInsert;
export type StripePrice = typeof stripePrices.$inferSelect;
export type NewStripePrice = typeof stripePrices.$inferInsert;

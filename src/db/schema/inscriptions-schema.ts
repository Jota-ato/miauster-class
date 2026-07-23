import {
  pgTable,
  uuid,
  varchar,
  numeric,
  date,
  timestamp,
  text,
  boolean,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { groups } from "./groups-schema";
import { students } from "./students-schema";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const inscriptions = pgTable(
  "inscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    groupId: uuid("group_id").references(() => groups.id, {
      onDelete: "restrict",
    }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => students.id, { onDelete: "restrict" }),
    levelTest: boolean("level_test").notNull().default(false),
    observations: text("observations"),
    priceSnapshot: numeric("price_snapshot", {
      precision: 10,
      scale: 2,
    }).notNull(),
    creatorNameSnapshot: varchar("creator_name_snapshot", {
      length: 50,
    }).notNull(),
    studentNameSnapshot: varchar("student_name_snapshot", {
      length: 50,
    }).notNull(),
    groupNameSnapshot: varchar("group_name_snapshot", { length: 20 }),
    groupStartDateSnapshot: date("group_start_date_snapshot", {
      mode: "string",
    }),
    approved: boolean("approved").notNull().default(false),
    comissionPaid: boolean("paid").notNull().default(false),
    invoiceImage: varchar("invoice_image", { length: 120 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedBy: text("updated_by").references(() => user.id, {
      onDelete: "restrict",
    }),
  },
  (table) => [
    // levelTest=true  -> sin grupo (groupId y snapshots en null)
    // levelTest=false -> debe tener grupo y sus snapshots
    check(
      "level_test_group_consistency",
      sql`(
        (${table.levelTest} = true AND ${table.groupId} IS NULL AND ${table.groupNameSnapshot} IS NULL AND ${table.groupStartDateSnapshot} IS NULL)
        OR
        (${table.levelTest} = false AND ${table.groupId} IS NOT NULL AND ${table.groupNameSnapshot} IS NOT NULL AND ${table.groupStartDateSnapshot} IS NOT NULL)
      )`,
    ),
  ],
);

export const inscriptionsRelations = relations(inscriptions, ({ one }) => ({
  creator: one(user, {
    fields: [inscriptions.createdBy],
    references: [user.id],
  }),
  updater: one(user, {
    fields: [inscriptions.updatedBy],
    references: [user.id],
  }),
  group: one(groups, {
    fields: [inscriptions.groupId],
    references: [groups.id],
  }),
  student: one(students, {
    fields: [inscriptions.studentId],
    references: [students.id],
  }),
}));

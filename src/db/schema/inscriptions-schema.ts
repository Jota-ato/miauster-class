import {
  pgTable,
  uuid,
  varchar,
  numeric,
  date,
  timestamp,
  text,
  boolean
} from "drizzle-orm/pg-core";
import { groups } from "./groups-schema";
import { students } from "./students-schema";
import { user } from "./auth-schema";
import { relations } from "drizzle-orm";

export const inscriptions = pgTable("inscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),
  groupId: uuid("group_id")
    .notNull()
    .references(() => groups.id, { onDelete: "restrict" }),
  studentId: uuid("student_id")
    .notNull()
    .references(() => students.id, { onDelete: "restrict" }),
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
  groupNameSnapshot: varchar("group_name_snapshot", { length: 20 }).notNull(),
  groupStartDateSnapshot: date("group_start_date_snapshot", {
    mode: "string",
  }).notNull(),
  approved: boolean("approved").notNull().default(false),
  comissionPaid: boolean("paid").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedBy: text("updated_by")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),
});

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
